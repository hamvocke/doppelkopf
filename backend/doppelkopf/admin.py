from flask import Blueprint, render_template, request, redirect, url_for
from .toggles import Toggle
from .db import db

blueprint = Blueprint("admin", __name__, url_prefix="/admin")


@blueprint.route("/", methods=["GET"])
def index():
    return render_template("admin/index.html")


@blueprint.route("/toggles", methods=["GET"])
def toggles_list():
    all_toggles = Toggle.query.all()
    return render_template("admin/toggles.html", toggles=all_toggles)


@blueprint.route("/toggles/submit", methods=["POST"])
def toggles_submit():
    all_toggles = Toggle.query.all()

    for toggle in all_toggles:
        # only enabled toggles end up in the request
        toggle.enabled = True if request.form.get(str(toggle.id)) else False
        db.session.add(toggle)

    db.session.commit()
    return redirect(url_for('admin.toggles_list'))
