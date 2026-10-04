import os
from PIL import Image, ImageDraw, ImageFont

def create_whatsapp_screenshot():
    # Dimensions: 500x750 px (Phone screenshot style)
    w, h = 540, 780
    img = Image.new("RGB", (w, h), color="#0B141A") # WhatsApp dark theme background
    draw = ImageDraw.Draw(img)

    # Top Bar
    draw.rectangle([(0, 0), (w, 65)], fill="#1F2C34")
    # Profile placeholder
    draw.ellipse([(15, 12), (55, 52)], fill="#00A884")
    
    # Text helper
    def draw_text(xy, text, fill="#E9EDEF", size=14, bold=False):
        draw.text(xy, text, fill=fill)

    draw.text((68, 16), "VIP Elite Traders Club [SEBI Reg]", fill="#E9EDEF")
    draw.text((68, 38), "online • 1,420 members", fill="#8696A0")

    # Date header pill
    draw.rounded_rectangle([(w//2 - 60, 85), (w//2 + 60, 110)], radius=6, fill="#182229")
    draw.text((w//2 - 25, 90), "TODAY", fill="#8696A0")

    # Chat Bubble 1 (Incoming scam offer)
    bubble_top = 130
    bubble_h = 420
    draw.rounded_rectangle([(25, bubble_top), (w - 25, bubble_top + bubble_h)], radius=12, fill="#1F2C34")

    # Chat bubble content
    lines = [
        ("🚨 SPECIAL PRE-MARKET NOTICE 🚨", "#FFD700"),
        ("", "#E9EDEF"),
        ("Dear Valued Members,", "#E9EDEF"),
        ("Our institutional quota opens TODAY for pre-IPO allocation.", "#E9EDEF"),
        ("👉 Guaranteed 35% return in 15 days.", "#25D366"),
        ("👉 100% capital protection under SEBI Scheme #9942.", "#25D366"),
        ("", "#E9EDEF"),
        ("⚡ ONLY 7 SLOTS REMAINING! ⚡", "#FF5252"),
        ("Deposit Rs. 50,000 to our institutional pool account:", "#E9EDEF"),
        ("UPI ID: instant.institutional.fund@ybl", "#00B0FF"),
        ("", "#E9EDEF"),
        ("⚠️ Deadline: 11:30 AM sharp. Unclaimed slots will be", "#E9EDEF"),
        ("allocated to waiting VIP investors.", "#E9EDEF"),
        ("", "#E9EDEF"),
        ("Forward payment screenshot immediately for verification.", "#E9EDEF"),
    ]

    y = bubble_top + 16
    for line, color in lines:
        if line:
            draw.text((45, y), line, fill=color)
        y += 24

    draw.text((w - 95, bubble_top + bubble_h - 26), "10:14 AM ✓✓", fill="#8696A0")

    # Bottom reply bar
    draw.rectangle([(0, h - 60), (w, h)], fill="#1F2C34")
    draw.rounded_rectangle([(15, h - 50), (w - 65, h - 12)], radius=20, fill="#2A3942")
    draw.text((35, h - 38), "Message...", fill="#8696A0")
    draw.ellipse([(w - 50, h - 50), (w - 12, h - 12)], fill="#00A884")

    output_path = os.path.join(os.path.dirname(__file__), "sample_whatsapp_scam.png")
    img.save(output_path, quality=95)
    print(f"Saved: {output_path}")

def create_fake_brochure():
    w, h = 600, 600
    img = Image.new("RGB", (w, h), color="#0F172A")
    draw = ImageDraw.Draw(img)

    # Gradient-like top banner
    draw.rectangle([(0, 0), (w, 100)], fill="#1E293B")
    draw.text((30, 25), "BHARAT WEALTH CAPITAL ADVISORY", fill="#38BDF8")
    draw.text((30, 55), "Government Approved & SEBI Certified Wealth Partner", fill="#94A3B8")

    # Main Card
    draw.rounded_rectangle([(30, 120), (w - 30, h - 30)], radius=16, fill="#1E293B", outline="#E11D48", width=2)
    
    # Alert badge
    draw.rounded_rectangle([(50, 140), (280, 175)], radius=6, fill="#E11D48")
    draw.text((65, 148), "GUARANTEED HIGH YIELD", fill="#FFFFFF")

    draw.text((50, 195), "GROW YOUR WEALTH FAST — 0% RISK", fill="#F8FAFC")
    draw.text((50, 230), "• Daily Payout: 2.5% compounding daily", fill="#E2E8F0")
    draw.text((50, 260), "• Monthly Return: Guaranteed 45% to 60%", fill="#E2E8F0")
    draw.text((50, 290), "• Minimum Investment: Rs. 10,000 only", fill="#E2E8F0")
    draw.text((50, 320), "• Withdraw principal anytime without penalty", fill="#E2E8F0")

    draw.rectangle([(50, 360), (w - 50, 362)], fill="#334155")

    draw.text((50, 380), "HOW TO JOIN TODAY:", fill="#38BDF8")
    draw.text((50, 410), "1. Transfer investment amount to Telegram Admin", fill="#CBD5E1")
    draw.text((50, 435), "2. Share OTP or bank SMS confirmation", fill="#CBD5E1")
    draw.text((50, 460), "3. Earn profits credited within 24 hours directly", fill="#CBD5E1")

    # Warning banner footer
    draw.rounded_rectangle([(50, 500), (w - 50, 545)], radius=8, fill="#450A0A")
    draw.text((70, 515), "URGENT: Limited slots available. Offer expires at 5:00 PM!", fill="#FCA5A5")

    output_path = os.path.join(os.path.dirname(__file__), "sample_fake_brochure.png")
    img.save(output_path, quality=95)
    print(f"Saved: {output_path}")

if __name__ == "__main__":
    create_whatsapp_screenshot()
    create_fake_brochure()
