from backend import app, influx


def send(name):
    print("{}".format(influx))
    influx.write(data="{} value=1".format(name), params={"db": app.config["INFLUXDB_DB"]}, protocol="line")
