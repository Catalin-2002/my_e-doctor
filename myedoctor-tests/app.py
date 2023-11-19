from flask import Flask

from  snellen_test.snellen_test_controller import snellen_test_blueprint
from  investigations.investigations_controller import investigations_blueprint

app = Flask(__name__)
# Register the snellen test blueprint
app.register_blueprint(snellen_test_blueprint, url_prefix='/api/snellen-test')
app.register_blueprint(investigations_blueprint, url_prefix='/api/investigations')

def print_routes(app):
    print('Available routes:')
    for rule in app.url_map.iter_rules():
        methods = ','.join(rule.methods)
        print(f"{rule.endpoint}: {rule.rule} [{methods}]")


if __name__ == '__main__':
    # print_routes(app)
    app.run(debug=True)