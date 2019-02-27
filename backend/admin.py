from flask import Blueprint, render_template


blueprint = Blueprint('admin', __name__, url_prefix='/admin')

@blueprint.route('/toggles/empty', methods=['GET'])
def toggles_empty():
    return render_template('admin/toggles-empty.html')


@blueprint.route("/toggles", methods=["GET"])
def toggles():
    return render_template('admin/toggles.html')
