from flask import Flask, url_for, request, render_template
import jyserver.Flask as jsf
from markupsafe import escape

app = Flask(__name__)


@jsf.use(app)
class JSConnectedApp:
    def __init__(self):
        self.count = 0

    def increment(self):
        self.count += 1
        self.js.document.getElementById("count").innerHTML = self.count


@app.route('/')
def main():
    return JSConnectedApp.render(render_template('index.html'))
