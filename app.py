from flask import Flask
from dotenv import load_dotenv
import os

from routes.describe import describe_bp
from routes.recommend import recommend_bp
from routes.report import report_bp

# Load .env from ai-service folder
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

app = Flask(__name__)

# Register routes
app.register_blueprint(describe_bp)
app.register_blueprint(recommend_bp)
app.register_blueprint(report_bp)

@app.route("/health")
def health():
    return {"status": "ok"}

if __name__ == "__main__":
    app.run(port=5000, debug=True)