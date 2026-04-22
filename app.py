from flask import Flask
from dotenv import load_dotenv
from routes.ai_routes import ai_bp

load_dotenv()

app = Flask(__name__)
app.register_blueprint(ai_bp)

@app.route("/health")
def health():
    return {"status": "ok"}

if __name__ == "__main__":
    app.run(port=5000, debug=True)