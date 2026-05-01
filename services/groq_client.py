import os
import time
from groq import Groq
from dotenv import load_dotenv

# ✅ Load env
load_dotenv()


def call_groq_safe(prompt):
    api_key = os.getenv("GROQ_API_KEY")


    if not api_key:
        print("ERROR: API KEY NOT FOUND")
        return None

    client = Groq(api_key=api_key)

    retries = 3

    for attempt in range(retries):
        try:
            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.5,
                max_tokens=500
            )

            return response.choices[0].message.content

        except Exception as e:
            print("ERROR:", e)
            time.sleep(2)

    return None


# ✅ THIS WAS MISSING
def stream_groq(prompt):
    api_key = os.getenv("GROQ_API_KEY")

    if not api_key:
        yield "[ERROR]: API key missing"
        return

    client = Groq(api_key=api_key)

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.5,
            max_tokens=500,
            stream=True  # 🔥 important for streaming
        )

        for chunk in response:
            if chunk.choices[0].delta.content:
                yield chunk.choices[0].delta.content

    except Exception as e:
        yield f"[ERROR]: {str(e)}"