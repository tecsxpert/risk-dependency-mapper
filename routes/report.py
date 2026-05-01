from flask import Blueprint, request, jsonify
from services.groq_client import call_groq_safe
import json
import re

report_bp = Blueprint("report", __name__)


def load_prompt(user_input):
    with open("prompts/report_prompt.txt", "r") as f:
        template = f.read()
    return template.replace("{input}", user_input)


def extract_json(text):
    match = re.search(r'\{.*\}', text, re.DOTALL)
    if match:
        return match.group(0)
    return None


@report_bp.route("/generate-report", methods=["POST"])
def generate_report():

    data = request.get_json()
    user_input = data.get("input", "").strip()

    if not user_input:
        return jsonify({"error": "Input required"}), 400

    prompt = load_prompt(user_input)

    # ✅ Safe AI call
    result = call_groq_safe(prompt)

    # ✅ Handle AI failure (Day 7 requirement)
    if not result:
        return jsonify({
            "title": "AI Report Unavailable",
            "executive_summary": None,
            "overview": None,
            "top_items": [],
            "recommendations": []
        })

    json_part = extract_json(result)

    if not json_part:
        return jsonify({
            "title": "AI Report Unavailable",
            "executive_summary": None,
            "overview": None,
            "top_items": [],
            "recommendations": []
        })

    try:
        parsed = json.loads(json_part)
    except:
        return jsonify({
            "title": "AI Report Unavailable",
            "executive_summary": None,
            "overview": None,
            "top_items": [],
            "recommendations": []
        })

    return jsonify(parsed)