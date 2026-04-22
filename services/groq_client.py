import os
from groq import Groq
import time

def call_groq(prompt):

    api_key = os.getenv("GROQ_API_KEY")
    print("API KEY:", api_key)

    client = Groq(api_key=api_key)

    retries = 3

    for attempt in range(retries):
        try:
            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[
                    {"role": "user", "content": prompt}
                ],
                temperature=0.5,
                max_tokens=500
            )

            return response.choices[0].message.content

        except Exception as e:
            print("FULL ERROR:", e)   # ✅ properly indented
            import traceback
            traceback.print_exc()
            time.sleep(2)

    return "AI service unavailable. Please try again later."