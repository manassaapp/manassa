"""
One-off migration used when forking Postiz into Manassa: rewrites every
translation that named the upstream product so it uses the {{brand}}
variable instead (filled from libraries/helpers/src/brand/brand.config.ts).
Kept for reference / re-running after pulling upstream translation updates.
Usage: python var/brand/brand_strings.py
"""
import json
import pathlib

LOCALES = (
    pathlib.Path(__file__).resolve().parents[2]
    / "libraries/react-shared-libraries/src/translation/locales"
)

U = {
    "webhooks_are_a_way_to_get_notified_when_something_happens_in_postiz_via_an_http_request": (
        "Webhooks are a way to get notified when something happens in {{brand}} via\n an HTTP request.",
        "روابط الويب (Webhooks) طريقة لتلقّي إشعار عبر طلب HTTP عند حدوث أي شيء في {{brand}}.",
    ),
    "check_n8n": (
        "Check out our N8N custom node for {{brand}}.",
        "اطّلع على عقدة n8n المخصّصة للعمل مع {{brand}}.",
    ),
    "use_postiz_api_to_integrate_with_your_tools": (
        "Use the {{brand}} API to integrate with your tools.",
        "استخدم واجهة {{brand}} البرمجية (API) لربط أدواتك.",
    ),
    "connect_your_mcp_client_to_postiz_to_schedule_your_posts_faster": (
        "Connect the {{brand}} MCP server to your client (HTTP streaming) to schedule your posts faster!",
        "اربط خادم MCP الخاص بـ{{brand}} بعميلك (بث HTTP) لتجدول منشوراتك بشكل أسرع!",
    ),
    "join_10000_entrepreneurs_who_use_postiz": (
        "Grow your social presence with {{brand}}",
        "نمِّ حضورك على منصات التواصل مع {{brand}}",
    ),
    "gitroom": ("{{brand}}", "{{brand}}"),
    "faq_am_i_going_to_be_charged_by_postiz": (
        "Am I going to be charged by {{brand}}?",
        "هل ستحصّل {{brand}} أي رسوم منّي؟",
    ),
    "faq_to_confirm_credit_card_information_postiz_will_hold": (
        "To confirm credit card information {{brand}} will hold $2 and release it immediately, you can cancel your subscription anytime from settings without talking to a person",
        "للتحقق من بيانات البطاقة، تحجز {{brand}} مبلغ 2 دولار ثم تُفرج عنه فورًا. ويمكنك إلغاء اشتراكك في أي وقت من الإعدادات دون الحاجة إلى التواصل مع أحد.",
    ),
    "faq_can_i_trust_postiz_gitroom": (
        "Can I trust {{brand}}?",
        "هل يمكنني الوثوق بـ{{brand}}؟",
    ),
    "faq_postiz_gitroom_is_proudly_open_source": (
        '{{brand}} is built on the open-source Postiz project (AGPL-3.0). We believe in an ethical and transparent culture: the source code of this service is available to every user. To view the upstream open-source repository, <a href="https://github.com/gitroomhq/postiz-app" target="_blank" rel="noopener noreferrer" style="text-decoration: underline;">click here</a>.',
        '{{brand}} مبنية على مشروع Postiz مفتوح المصدر (رخصة AGPL-3.0). نؤمن بثقافة أخلاقية وشفافة، لذلك يتاح الكود المصدري لهذه الخدمة لكل مستخدميها. لعرض مستودع المشروع الأصلي مفتوح المصدر <a href="https://github.com/gitroomhq/postiz-app" target="_blank" rel="noopener noreferrer" style="text-decoration: underline;">اضغط هنا</a>.',
    ),
    "faq_postiz_gitroom_allows_you_to_schedule_posts": (
        "{{brand}} allows you to schedule your posts between different channels.\nA channel is a publishing platform where you can schedule your posts.\nFor example, you can schedule your posts on X, Facebook, Instagram, TikTok, YouTube, Reddit, Linkedin, Dribbble, Threads and Pinterest.",
        "تتيح لك {{brand}} جدولة منشوراتك على قنوات مختلفة.\nالقناة هي منصة نشر يمكنك جدولة منشوراتك عليها.\nعلى سبيل المثال، يمكنك جدولة منشوراتك على X وFacebook وInstagram وTikTok وYouTube وReddit وLinkedIn وDribbble وThreads وPinterest.",
    ),
    "billing_postiz_grow_social": (
        "{{brand}} to grow their social presence",
        "{{brand}} لتنمية حضورهم على منصات التواصل",
    ),
    "agent_welcome_message": (
        "Hello, I am your {{brand}} agent 🙌🏻.\n\nI can schedule a post or multiple posts to multiple channels and generate pictures and videos.\n\nYou can select the channels you want to use from the channels menu.\n\nYou can see your previous conversations from the conversations menu.\n\nYou can also use me as an MCP Server, check Settings >> Agents / Dev",
        "مرحبًا، أنا وكيلك الذكي في {{brand}} 🙌🏻.\n\nأستطيع جدولة منشور واحد أو عدة منشورات على أكثر من قناة، وإنشاء الصور ومقاطع الفيديو.\n\nاختر القنوات التي تريد استخدامها من قائمة القنوات.\n\nوتجد محادثاتك السابقة في قائمة المحادثات.\n\nيمكنك أيضًا استخدامي كخادم MCP من الإعدادات ← الوكلاء / المطوّرون.",
    ),
    "farcaster_approve_instructions": (
        "Scan the QR code with your phone, or open the link on your phone, then approve {{brand}} in the Farcaster app.",
        "امسح رمز QR بهاتفك أو افتح الرابط على هاتفك، ثم وافق على {{brand}} في تطبيق Farcaster.",
    ),
    "farcaster_scan_instructions": (
        "Scan the QR code with your phone, or copy the link and open it on your phone, then approve {{brand}} in the Farcaster app.",
        "امسح رمز QR بهاتفك، أو انسخ الرابط وافتحه على هاتفك، ثم وافق على {{brand}} في تطبيق Farcaster.",
    ),
    "sign_in_no_api_key": (
        "Sign in with {{brand}} (no API key)",
        "تسجيل الدخول عبر {{brand}} (دون مفتاح API)",
    ),
    "oauth_sign_in_hint": (
        "Your agent will open a browser window to sign in to {{brand}}.",
        "سيفتح وكيلك نافذة متصفح لتسجيل الدخول إلى {{brand}}.",
    ),
    "api_onboarding_description": (
        "Use the {{brand}} API from your own code, n8n or any other automation",
        "استخدم واجهة {{brand}} البرمجية من كودك الخاص أو n8n أو أي أداة أتمتة أخرى",
    ),
    "chat_onboarding_description": (
        "No MCP or CLI settings needed. Paste this into the chat, the agent installs the command-line tool and asks you for your API key.",
        "لا حاجة لإعداد MCP أو سطر الأوامر. الصق هذا النص في المحادثة، وسيثبّت الوكيل أداة سطر الأوامر ويطلب منك مفتاح API.",
    ),
    "connector_onboarding_description": (
        "The fastest way: add {{brand}} with one click, you will be asked to sign in",
        "الطريقة الأسرع: أضف {{brand}} بنقرة واحدة، وسيُطلب منك تسجيل الدخول",
    ),
    "connector_self_hosted_description": (
        'The official connector works with self-hosted instances too. When asked to sign in, choose "Use self-hosted" and enter {{url}} with your API key.',
        'يعمل الموصّل الرسمي مع النسخ المستضافة ذاتيًا أيضًا. عند طلب تسجيل الدخول اختر "Use self-hosted" وأدخل {{url}} مع مفتاح API الخاص بك.',
    ),
    "mcp_onboarding_description": (
        "Give your agent {{brand}} tools to create, schedule and manage posts",
        "زوّد وكيلك بأدوات {{brand}} لإنشاء المنشورات وجدولتها وإدارتها",
    ),
    "cli_onboarding_description": (
        "Install the command-line tool and the skill that teaches your agent how to use it",
        "ثبّت أداة سطر الأوامر والمهارة التي تعلّم وكيلك طريقة استخدامها",
    ),
    "watch_tutorial_title": (
        "Learn How to Use {{brand}}",
        "تعرّف على طريقة استخدام {{brand}}",
    ),
    "watch_tutorial_description": (
        "Watch this short video to learn how to get the most out of {{brand}}",
        "شاهد هذا الفيديو القصير لتستفيد من {{brand}} بأفضل شكل",
    ),
    "delete_published_post_note": (
        "A published post is removed from {{brand}} only and stays live where it was published.",
        "يُحذف المنشور من {{brand}} فقط، ويبقى ظاهرًا على المنصة التي نُشر عليها.",
    ),
    "delete_this_published_post_note": (
        "It is removed from {{brand}} only and stays live where it was published.",
        "يُحذف من {{brand}} فقط، ويبقى ظاهرًا على المنصة التي نُشر عليها.",
    ),
    "hubspot_installed": (
        "{{brand}} is installed in HubSpot",
        "تم تثبيت {{brand}} في HubSpot",
    ),
    "hubspot_installed_description": (
        "Connect the channels you want to post to here in {{brand}}. Then, in HubSpot, open Agent Hub > Agent Builder, add a tool, pick the {{brand}} MCP server under MCP Servers and click Connect and add.",
        "اربط هنا في {{brand}} القنوات التي تريد النشر عليها. ثم افتح في HubSpot المسار Agent Hub > Agent Builder، وأضف أداة، واختر خادم MCP الخاص بـ{{brand}} من MCP Servers، ثم اضغط Connect and add.",
    ),
    "media_settings_section_tooltip": (
        "Thumbnails apply to videos in the main post and are sent to every channel that supports them. YouTube may ignore them on videos it treats as Shorts (vertical, up to 3 minutes) without failing the publish, and requires a phone-verified channel for custom thumbnails. If YouTube rejects the thumbnail the video is still published, and {{brand}} cannot check eligibility in advance.",
        "تُطبَّق الصور المصغّرة على مقاطع الفيديو في المنشور الرئيسي وتُرسل إلى كل قناة تدعمها. قد يتجاهلها YouTube في المقاطع التي يعاملها كـ Shorts (عمودية وحتى 3 دقائق) دون أن يفشل النشر، ويشترط أن تكون القناة موثّقة برقم هاتف لاستخدام صور مصغّرة مخصّصة. إذا رفض YouTube الصورة المصغّرة يُنشر الفيديو رغم ذلك، ولا تستطيع {{brand}} التحقق من الأهلية مسبقًا.",
    ),
    "connect_link_title": (
        "{{brand}} wants to connect to your {{platform}}",
        "تطلب {{brand}} الاتصال بحسابك على {{platform}}",
    ),
    "connect_link_automate": (
        "{{brand}} will automate your {{platform}} account: it can schedule and publish posts on your behalf",
        "ستتولّى {{brand}} أتمتة حسابك على {{platform}}: يمكنها جدولة المنشورات ونشرها نيابةً عنك",
    ),
    "connect_link_system": (
        "Everything goes through the {{brand}} system: your account is added to a {{brand}} workspace and managed from there",
        "يمرّ كل شيء عبر نظام {{brand}}: يُضاف حسابك إلى مساحة عمل في {{brand}} ويُدار منها",
    ),
    "connect_link_redirect": (
        "When you are done you will be sent to {{site}}, a website outside of {{brand}}",
        "عند الانتهاء ستنتقل إلى {{site}}، وهو موقع خارج {{brand}}",
    ),
}


def update(lang: str, idx: int):
    path = LOCALES / lang / "translation.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    for key, values in U.items():
        if key in data:
            data[key] = values[idx]
        else:
            print("missing", lang, key)
    path.write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8", newline="\n"
    )
    left = [k for k, v in data.items() if "Postiz" in v and "postiz-app" not in v]
    print(lang, "keys still naming Postiz:", left)


if __name__ == "__main__":
    update("en", 0)
    update("ar", 1)
