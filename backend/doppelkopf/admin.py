from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import login_required
from sqlalchemy.sql.functions import func
from datetime import datetime, timedelta
from .toggles import Toggle
from .events import Event, EventTypes
from .db import db

blueprint = Blueprint("admin", __name__, url_prefix="/admin")


@blueprint.route("/", methods=["GET"])
@login_required
def index():
    now = datetime.utcnow()
    last_week = datetime.utcnow() - timedelta(days=7)
    events_by_date = (db.session
                      .query(Event.created_at, Event.event_type, func.count(Event.event_type))
                      .group_by(Event.event_type, Event.created_at)
                      .filter(Event.created_at.between(last_week, now))
                      .all())

    print(events_by_date)

    games_started = Event.query.filter(Event.event_type == EventTypes.GAME_START).count()
    games_won = Event.query.filter(Event.event_type == EventTypes.GAME_WIN).count()
    games_lost = Event.query.filter(Event.event_type == EventTypes.GAME_LOSE).count()

    games_started_weekly = [event[2] for event in events_by_date if event.event_type == EventTypes.GAME_START]
    games_won_weekly = [event[2] for event in events_by_date if event.event_type == EventTypes.GAME_WIN]
    games_lost_weekly = [event[2] for event in events_by_date if event.event_type == EventTypes.GAME_LOSE]

    stats = {
        "games_started": games_started,
        "games_won": games_won,
        "games_lost": games_lost,
        "games_started_weekly": games_started_weekly,
        "games_won_weekly": games_won_weekly,
        "games_lost_weekly": games_lost_weekly
    }

    return render_template("admin/index.html", stats=stats)


@blueprint.route("/toggles", methods=["GET"])
@login_required
def toggles_list():
    all_toggles = Toggle.query.all()
    return render_template("admin/toggles.html", toggles=all_toggles)


@blueprint.route("/toggles/submit", methods=["POST"])
@login_required
def toggles_submit():
    all_toggles = Toggle.query.all()

    for toggle in all_toggles:
        # only enabled toggles end up in the request
        if request.form.get(str(toggle.id)):
            if not toggle.enabled:
                toggle.toggle()
        else:
            if toggle.enabled:
                toggle.toggle()
        db.session.add(toggle)

    db.session.commit()
    flash("Toggle state saved")
    return redirect(url_for("admin.toggles_list"))
