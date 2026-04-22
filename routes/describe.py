from flask import Blueprint, request, jsonify
from datetime import datetime
from services.groq_client import call_groq

describe_bp = Blueprint("describe", __name__)

# Load prompt template
def load_prompt(user_input):
    with open("prompts/describe_prompt.txt", "r") as f:
        template = f.read()
    return template.replace("{input}", user_input)


@describe_bp.route("/describe", methods=["POST"])
def describe():

    data = request.get_json()

    # ✅ Input validation
    if not data or "input" not in data:
        return jsonify({"error": "Input is required"}), 400

    user_input = data["input"]

    if len(user_input.strip()) == 0:
        return jsonify({"error": "Input cannot be empty"}), 400

    # ✅ Load prompt
    prompt = load_prompt(user_input)

    # ✅ Call Groq
    result = call_groq(prompt)

    # ✅ Return structured response
    return jsonify({
        "description": result,
        "generated_at": datetime.utcnow().isoformat()
    })