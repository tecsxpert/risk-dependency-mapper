from flask import Flask
from dotenv import load_dotenv
from routes.describe import describe_bp

load_dotenv()

app = Flask(__name__)

# Register route
app.register_blueprint(describe_bp)

@app.route("/health")
def health():
    return {"status": "ok"}

if __name__ == "__main__":
    app.run(port=5000, debug=True)