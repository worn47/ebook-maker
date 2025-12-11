"""
Gemini 3 Pro Image Generation (Nano Banana Pro)
Generates a portrait image using Google's latest image generation model.
"""

from google import genai
from google.genai import types
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# Define the prompt for abstract AI cover image
prompt = "Abstract visualization of prompt engineering and human-AI communication, glowing text particles and neural pathways converging into a brilliant golden center, flowing streams of light representing language and knowledge, professional corporate style with deep purple and gold gradients, ethereal futuristic atmosphere, clean modern design suitable as premium ebook cover background"

print(f"Generating image with prompt: {prompt}")
print("Using model: gemini-3-pro-image-preview (Nano Banana Pro)")
print("Aspect ratio: 3:4 (portrait page)")
print()

response = client.models.generate_content(
    model="gemini-3-pro-image-preview",
    contents=prompt,
    config=types.GenerateContentConfig(
        response_modalities=['TEXT', 'IMAGE'],
        image_config=types.ImageConfig(
            aspect_ratio="3:4",   # Portrait page ratio
            image_size="2K"       # Options: 1K, 2K, 4K
        ),
    )
)

# Process the response
for part in response.parts:
    if part.text is not None:
        print(f"Model response: {part.text}")
    elif image := part.as_image():
        output_path = "output/cover_image.png"
        image.save(output_path)
        print(f"Image saved to: {output_path}")
