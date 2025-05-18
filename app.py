import gradio as gr
from diffusers import StableDiffusionPipeline
import torch

# تحميل نموذج Stable Diffusion
pipe = StableDiffusionPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=torch.float16
).to("cuda")

def generate(prompt):
    image = pipe(prompt).images[0]
    return image

interface = gr.Interface(
    fn=generate,
    inputs=gr.Textbox(label="أدخل وصف الصورة"),
    outputs=gr.Image(type="pil", label="الصورة الناتجة"),
    title="توليد صور من النص",
    description="اكتب وصفًا لأي مشهد وسيتم توليد صورة واقعية باستخدام Stable Diffusion."
)

interface.launch()