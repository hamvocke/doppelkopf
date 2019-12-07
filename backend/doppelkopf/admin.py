from flask import Blueprint, render_template, request, redirect, url_for, flash
from .toggles import Toggle
from .events import Event, EventTypes
from .db import db

blueprint = Blueprint("admin", __name__, url_prefix="/admin")


@blueprint.route("/", methods=["GET"])
def index():
    all_events = Event.query.all()
    games_started = [
        event for event in all_events if event.event_type == EventTypes.GAME_START
    ]
    games_won = [
        event for event in all_events if event.event_type == EventTypes.GAME_WIN
    ]
    games_lost = [
        event for event in all_events if event.event_type == EventTypes.GAME_LOSE
    ]

    stats = {
        "games_started": len(games_started),
        "games_won": len(games_won),
        "games_lost": len(games_lost),
    }

    return render_template("admin/index.html", stats=stats)


@blueprint.route("/toggles", methods=["GET"])
def toggles_list():
    all_toggles = Toggle.query.all()
    return render_template("admin/toggles.html", toggles=all_toggles)


@blueprint.route("/toggles/submit", methods=["POST"])
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
