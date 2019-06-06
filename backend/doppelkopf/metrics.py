from doppelkopf.influx import get_influx


def create_database():
    return get_influx().create_database("doppelkopf")


def send(name: str):
    return get_influx().write(
        data="{} value=1".format(name),
        protocol="line",
    )
