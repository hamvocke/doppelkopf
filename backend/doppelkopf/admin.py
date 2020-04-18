from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import login_required
from .toggles import Toggle
from .db import db
from .events import EventTypes
from . import stats

blueprint = Blueprint("admin", __name__, url_prefix="/admin")


@blueprint.route("/", methods=["GET"])
@login_required
def index():
    weekly_stats = stats.calculate_weekly()
    total_stats = stats.calculate_total()

    all_stats = {
        "games_started": total_stats[EventTypes.GAME_START],
        "games_won": total_stats[EventTypes.GAME_WIN],
        "games_lost": total_stats[EventTypes.GAME_LOSE],
        "games_started_weekly": weekly_stats[EventTypes.GAME_START],
        "games_won_weekly": weekly_stats[EventTypes.GAME_WIN],
        "games_lost_weekly": weekly_stats[EventTypes.GAME_LOSE],
    }

    return render_template("admin/index.html", stats=all_stats)


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
