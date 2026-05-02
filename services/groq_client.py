import os
import time
from groq import Groq
from dotenv import load_dotenv

# Load env
load_dotenv()


def call_groq_safe(prompt):
    api_key = os.getenv("GROQ_API_KEY")

    # 🔐 Do NOT expose reason
    if not api_key:
        return None

    client = Groq(api_key=api_key)

    retries = 3

    for _ in range(retries):
        try:
            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.5,
                max_tokens=500
            )

            return response.choices[0].message.content

        except Exception:
            # 🔐 No print, no leak
            time.sleep(2)

    return None


def stream_groq(prompt):
    api_key = os.getenv("GROQ_API_KEY")

    # 🔐 Do NOT expose error details
    if not api_key:
        yield "Service unavailable"
        return

    client = Groq(api_key=api_key)

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.5,
            max_tokens=500,
            stream=True
        )

        for chunk in response:
            if chunk.choices[0].delta.content:
                yield chunk.choices[0].delta.content

    except Exception:
        # 🔐 Generic message only
        yield "Service unavailable"