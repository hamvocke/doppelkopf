from .users import User, users
from .admin import blueprint
from flask_login import LoginManager, login_user, logout_user

from flask import request, render_template, redirect, url_for, abort

login_manager = LoginManager()
login_manager.login_view = "admin.login"


def init_app(app):
    login_manager.init_app(app)


@login_manager.user_loader
def load_user(email):
    if email not in users:
        return

    user = User()
    user.id = email
    return user
    # return User.query.get(email)


@login_manager.request_loader
def request_loader(request):
    email = request.form.get("email")
    if email not in users:
        return

    user = User()
    user.id = email

    user.is_authenticated = request.form["password"] == users[email]["password"]

    return user


@blueprint.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "GET":
        return render_template("admin/login.html")

    email = request.form.get("email")
    password = request.form.get("password")
    if password == users[email]["password"]:
        user = User()
        user.id = email
        login_user(user)

        next = request.args.get("next")
        # is_safe_url should check if the url is safe for redirects.
        # See http://flask.pocoo.org/snippets/62/ for an example.
        # if not is_safe_url(next):
        # return abort(400)

        return redirect(next or url_for("admin.index"))

    return render_template(
        "admin/login.html", error="Ah ah ah! You didn't say the magic word!"
    )


@blueprint.route("/logout")
def logout():
    logout_user()
    return "Logged out"
