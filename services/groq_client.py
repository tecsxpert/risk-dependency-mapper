import os
import time
from groq import Groq

def call_groq_safe(prompt):
    api_key = os.getenv("GROQ_API_KEY")

    # ✅ DEBUG: check which key is actually used
    print("KEY USED:", api_key)

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
            print("ERROR:", e)
            time.sleep(2)

    return None