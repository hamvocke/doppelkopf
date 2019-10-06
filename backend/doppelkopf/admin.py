from flask import Blueprint, render_template
from doppelkopf.toggles import Toggle

blueprint = Blueprint("admin", __name__, url_prefix="/admin")


@blueprint.route("/toggles", methods=["GET"])
def toggles_endpoint():
    all_toggles = Toggle.query.all()
    return render_template("admin/toggles.html", toggles=all_toggles)
