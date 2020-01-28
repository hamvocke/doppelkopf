from typing import Optional

from flask import request, render_template, redirect, url_for, abort
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, login_user, logout_user

from .admin import blueprint
from .helpers import is_safe_url
from .users import User

login_manager = LoginManager()
login_manager.login_view = "admin.login"

crypt = Bcrypt()


def init_app(app):
    login_manager.init_app(app)
    crypt.init_app(app)


@login_manager.user_loader
def load_user(id: str) -> User:
    return User.query.get(int(id))


def load_user_by_name(name: str) -> User:
    return User.query.filter(User.username == name).first()


@login_manager.request_loader
def request_loader(request) -> Optional[User]:
    name = request.form.get("name")

    user = load_user_by_name(name)

    if user:
        if not user.is_correct_password(request.form.get("password")):
            return None

    return user


@blueprint.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "GET":
        return render_template("admin/login.html")

    name = request.form.get("name")
    password = request.form.get("password")
    user = load_user_by_name(name)

    if user is not None and user.is_correct_password(password):
        login_user(user)

        next = request.args.get("next")
        if not is_safe_url(next):
            return abort(400)

        return redirect(next or url_for("admin.index"))

    return render_template(
        "admin/login.html", error="Ah ah ah! You didn't say the magic word!"
    )


@blueprint.route("/logout")
def logout():
    logout_user()
    return "Logged out"
