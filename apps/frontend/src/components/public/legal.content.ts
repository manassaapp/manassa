/**
 * Privacy Policy and Terms of Service text for the public pages.
 * {{brand}}, {{email}}, {{country}} and {{updated}} are filled in from
 * libraries/helpers/src/brand/brand.config.ts.
 *
 * IMPORTANT: this is a starting draft written for the product as it is built
 * (a social media scheduler that connects to platforms such as TikTok through
 * their official APIs). It is not legal advice. Have it reviewed for your
 * company and country before launch, and update brand.legal in
 * brand.config.ts (company name, contact e-mail, country).
 */
export type LegalSection = { title: string; body: string[] };
export type LegalDoc = { title: string; intro: string; sections: LegalSection[] };

export const privacyPolicy: Record<'ar' | 'en', LegalDoc> = {
  en: {
    title: 'Privacy Policy',
    intro:
      'This policy explains what information {{brand}} collects, how we use it and the choices you have. Last updated: {{updated}}.',
    sections: [
      {
        title: '1. Who we are',
        body: [
          '{{brand}} is a service for planning, scheduling and publishing content to social media accounts that you connect. You can contact us at {{email}}.',
        ],
      },
      {
        title: '2. Information we collect',
        body: [
          'Account information: your name, e-mail address, password (stored only as a secure hash), language and time zone.',
          'Content you create: posts, captions, comments, media files, schedules, drafts and settings.',
          'Connected social accounts: when you connect an account (for example TikTok, Instagram, YouTube, X or LinkedIn) we receive, through the platform’s official API and only with your permission, the access tokens and the basic profile information the platform shares, such as your display name, username and profile picture.',
          'TikTok: when you connect TikTok we use TikTok’s Login Kit and Content Posting API. We receive your basic profile information (open ID, display name, avatar), the creator information TikTok provides when you prepare a post (nickname, allowed privacy options, interaction settings, maximum video length), and, if you enable analytics, statistics about your videos. We upload the videos or photos you choose, with the caption and settings you choose, only when you schedule or publish a post.',
          'Usage and technical data: log data, device and browser information and cookies needed to keep you signed in and remember your language.',
          'Billing information, if you subscribe to a paid plan, is processed by our payment provider; we do not store full card numbers.',
        ],
      },
      {
        title: '3. How we use information',
        body: [
          'To provide the service: store your content, publish it to the accounts you connected at the time you choose, show you previews, statuses and analytics.',
          'To operate and secure the service, prevent abuse and fix problems.',
          'To contact you about your account, security and important changes.',
          'Optional AI features send the text or prompts you submit to an AI provider to generate suggestions; they are used only when you ask for them.',
          'We do not sell your personal information and we do not use content from your connected accounts for advertising.',
        ],
      },
      {
        title: '4. Sharing',
        body: [
          'With the social platforms you connect, only to perform the actions you request (for example publishing a post to TikTok).',
          'With service providers that host and run the service for us (hosting, storage, e-mail, payments, AI), under contracts that protect your data.',
          'When required by law, or to protect the rights and safety of users and the service.',
        ],
      },
      {
        title: '5. Retention and deletion',
        body: [
          'We keep your information while your account is active. You can disconnect any social account at any time from the app; we then delete its access tokens.',
          'You can delete your account from the settings or by writing to {{email}}. We delete your account data within 30 days, except where we must keep it by law. Content already published on a social platform stays there and is controlled by that platform.',
          'You can also revoke our access from the platform itself, for example in TikTok: Settings and privacy > Security > Manage app permissions.',
        ],
      },
      {
        title: '6. Your rights',
        body: [
          'Depending on where you live, you may have the right to access, correct, export or delete your personal information, and to object to or restrict some processing. Contact {{email}} to use these rights.',
        ],
      },
      {
        title: '7. Security',
        body: [
          'We use encryption in transit, access controls and secure storage of credentials. No service is completely secure, so please use a strong password and keep it private.',
        ],
      },
      {
        title: '8. Children',
        body: [
          'The service is not intended for children under 13 (or the minimum age in your country), and we do not knowingly collect their information.',
        ],
      },
      {
        title: '9. Changes',
        body: [
          'We may update this policy. We will post the new version on this page and, for important changes, tell you by e-mail or in the app.',
        ],
      },
      {
        title: '10. Contact',
        body: ['Questions about privacy: {{email}} ({{country}}).'],
      },
    ],
  },
  ar: {
    title: 'سياسة الخصوصية',
    intro:
      'توضّح هذه السياسة المعلومات التي تجمعها {{brand}} وكيف نستخدمها والخيارات المتاحة لك. آخر تحديث: {{updated}}.',
    sections: [
      {
        title: '1. من نحن',
        body: [
          '{{brand}} خدمة لتخطيط المحتوى وجدولته ونشره على حسابات التواصل الاجتماعي التي تربطها بها. للتواصل معنا: {{email}}.',
        ],
      },
      {
        title: '2. المعلومات التي نجمعها',
        body: [
          'معلومات الحساب: اسمك وبريدك الإلكتروني وكلمة المرور (تُحفظ مُشفّرة فقط) ولغتك ومنطقتك الزمنية.',
          'المحتوى الذي تنشئه: المنشورات والنصوص والتعليقات وملفات الوسائط والمواعيد والمسودات والإعدادات.',
          'الحسابات المرتبطة: عند ربط حساب (مثل TikTok أو Instagram أو YouTube أو X أو LinkedIn) نستلم عبر الواجهة البرمجية الرسمية للمنصة، وبإذنك فقط، رموز الوصول ومعلومات الملف الأساسية التي تشاركها المنصة مثل الاسم المعروض واسم المستخدم والصورة الشخصية.',
          'TikTok: عند ربط حساب TikTok نستخدم Login Kit وContent Posting API من TikTok. نستلم معلومات ملفك الأساسية (المعرّف والاسم المعروض والصورة)، ومعلومات صانع المحتوى التي يقدمها TikTok عند تجهيز منشور (الاسم المستعار وخيارات الخصوصية المسموحة وإعدادات التفاعل وأقصى مدة للفيديو)، وإحصاءات مقاطعك إذا فعّلت التحليلات. نرفع مقاطع الفيديو أو الصور التي تختارها، بالنص والإعدادات التي تحددها، فقط عند جدولة المنشور أو نشره.',
          'بيانات الاستخدام والبيانات التقنية: سجلات النظام ومعلومات الجهاز والمتصفح وملفات تعريف الارتباط اللازمة لإبقائك مسجّل الدخول وتذكّر لغتك.',
          'بيانات الدفع عند الاشتراك في باقة مدفوعة يعالجها مزوّد الدفع، ولا نحتفظ بأرقام البطاقات كاملة.',
        ],
      },
      {
        title: '3. كيف نستخدم المعلومات',
        body: [
          'لتقديم الخدمة: حفظ محتواك ونشره على الحسابات التي ربطتها في الوقت الذي تختاره، وعرض المعاينات وحالات النشر والتحليلات.',
          'لتشغيل الخدمة وحمايتها ومنع إساءة الاستخدام وإصلاح الأعطال.',
          'للتواصل معك بشأن حسابك وأمانه والتغييرات المهمة.',
          'ميزات الذكاء الاصطناعي اختيارية، وترسل النص أو الطلب الذي تكتبه إلى مزوّد ذكاء اصطناعي لتوليد الاقتراحات، ولا تُستخدم إلا عندما تطلبها.',
          'لا نبيع معلوماتك الشخصية، ولا نستخدم محتوى حساباتك المرتبطة لأغراض إعلانية.',
        ],
      },
      {
        title: '4. مشاركة المعلومات',
        body: [
          'مع منصات التواصل التي تربطها، فقط لتنفيذ ما تطلبه (مثل نشر منشور على TikTok).',
          'مع مزوّدي الخدمات الذين يستضيفون الخدمة ويشغّلونها لصالحنا (الاستضافة والتخزين والبريد والدفع والذكاء الاصطناعي)، بموجب عقود تحمي بياناتك.',
          'عندما يفرض القانون ذلك، أو لحماية حقوق المستخدمين والخدمة وسلامتهم.',
        ],
      },
      {
        title: '5. الاحتفاظ بالبيانات وحذفها',
        body: [
          'نحتفظ بمعلوماتك ما دام حسابك نشطًا. يمكنك فصل أي حساب تواصل في أي وقت من داخل التطبيق، وعندها نحذف رموز الوصول الخاصة به.',
          'يمكنك حذف حسابك من الإعدادات أو بمراسلتنا على {{email}}. نحذف بيانات حسابك خلال 30 يومًا، إلا ما يُلزمنا القانون بالاحتفاظ به. المحتوى المنشور بالفعل على أي منصة يبقى عليها وتتحكم فيه تلك المنصة.',
          'يمكنك أيضًا إلغاء صلاحياتنا من المنصة نفسها، ففي TikTok مثلًا: الإعدادات والخصوصية ← الأمان ← إدارة أذونات التطبيقات.',
        ],
      },
      {
        title: '6. حقوقك',
        body: [
          'بحسب مكان إقامتك، قد يحق لك الاطلاع على معلوماتك الشخصية أو تصحيحها أو تصديرها أو حذفها، والاعتراض على بعض المعالجة أو تقييدها. راسلنا على {{email}} لممارسة هذه الحقوق.',
        ],
      },
      {
        title: '7. الأمان',
        body: [
          'نستخدم التشفير أثناء النقل وضوابط الوصول والتخزين الآمن لبيانات الدخول. لا توجد خدمة آمنة تمامًا، لذا استخدم كلمة مرور قوية واحتفظ بها لنفسك.',
        ],
      },
      {
        title: '8. الأطفال',
        body: [
          'الخدمة غير موجّهة للأطفال دون 13 عامًا (أو الحد الأدنى للسن في بلدك)، ولا نجمع معلوماتهم عن قصد.',
        ],
      },
      {
        title: '9. التغييرات',
        body: [
          'قد نحدّث هذه السياسة. سننشر النسخة الجديدة في هذه الصفحة، ونبلغك بالتغييرات المهمة عبر البريد أو داخل التطبيق.',
        ],
      },
      {
        title: '10. التواصل',
        body: ['لأي أسئلة عن الخصوصية: {{email}} ({{country}}).'],
      },
    ],
  },
};

export const termsOfService: Record<'ar' | 'en', LegalDoc> = {
  en: {
    title: 'Terms of Service',
    intro:
      'These terms govern your use of {{brand}}. By creating an account or using the service you agree to them. Last updated: {{updated}}.',
    sections: [
      {
        title: '1. The service',
        body: [
          '{{brand}} lets you create, schedule and publish content to social media accounts you connect, collaborate with a team, and view analytics. Features may change as we improve the service.',
        ],
      },
      {
        title: '2. Your account',
        body: [
          'You must give accurate information, keep your password safe and be responsible for activity in your account and workspaces. You must be old enough to use the service and the platforms you connect.',
        ],
      },
      {
        title: '3. Connected platforms',
        body: [
          'When you connect a social account you authorise us to act on it only as you instruct, for example to publish a post at the time you choose. You must follow the rules of each platform, including TikTok’s Terms of Service, Community Guidelines, Music Usage Confirmation and Branded Content Policy.',
          'Platforms may change or limit their APIs, reject content or take time to process it. We are not responsible for decisions made by a platform.',
        ],
      },
      {
        title: '4. Your content',
        body: [
          'You keep all rights to your content. You give us the permission needed to store, process and publish it on your behalf. You are responsible for having the rights to everything you post, including music, images and trademarks, and for disclosing commercial content where required.',
        ],
      },
      {
        title: '5. Acceptable use',
        body: [
          'Do not use the service for spam, illegal content, harassment, misleading content, malware, or to break the rules of any platform. We may suspend accounts that do.',
        ],
      },
      {
        title: '6. Paid plans',
        body: [
          'Paid plans are billed in advance through our payment provider. You can cancel at any time from the billing page; the plan stays active until the end of the period you paid for.',
        ],
      },
      {
        title: '7. Open source',
        body: [
          '{{brand}} is based on the open-source Postiz project and is distributed under the GNU Affero General Public License v3.0 (AGPL-3.0). You can obtain the complete source code of the version we run from the "Source code" link at the bottom of this page.',
        ],
      },
      {
        title: '8. Disclaimer and liability',
        body: [
          'The service is provided "as is". To the extent allowed by law, we are not liable for indirect or consequential losses, lost profits, or content that a platform rejects, delays or removes.',
        ],
      },
      {
        title: '9. Ending the agreement',
        body: [
          'You can stop using the service and delete your account at any time. We may suspend or end access if these terms are broken.',
        ],
      },
      {
        title: '10. Changes and contact',
        body: [
          'We may update these terms and will post the new version here. Questions: {{email}}. These terms are governed by the laws of {{country}}.',
        ],
      },
    ],
  },
  ar: {
    title: 'شروط الاستخدام',
    intro:
      'تنظّم هذه الشروط استخدامك لـ{{brand}}. بإنشاء حساب أو استخدام الخدمة فإنك توافق عليها. آخر تحديث: {{updated}}.',
    sections: [
      {
        title: '1. الخدمة',
        body: [
          'تتيح لك {{brand}} إنشاء المحتوى وجدولته ونشره على حسابات التواصل التي تربطها، والعمل مع فريقك، ومتابعة التحليلات. قد تتغير الميزات مع تطوير الخدمة.',
        ],
      },
      {
        title: '2. حسابك',
        body: [
          'عليك تقديم معلومات صحيحة والحفاظ على سرية كلمة المرور، وأنت مسؤول عن النشاط في حسابك ومساحات العمل الخاصة بك. يجب أن تكون قد بلغت السن المسموح بها لاستخدام الخدمة والمنصات التي تربطها.',
        ],
      },
      {
        title: '3. المنصات المرتبطة',
        body: [
          'عند ربط حساب تواصل فإنك تفوّضنا بالتصرف فيه وفق تعليماتك فقط، مثل نشر منشور في الوقت الذي تحدده. ويجب عليك الالتزام بقواعد كل منصة، بما فيها شروط خدمة TikTok وإرشادات المجتمع وتأكيد استخدام الموسيقى وسياسة المحتوى المدفوع.',
          'قد تغيّر المنصات واجهاتها البرمجية أو تقيّدها، أو ترفض محتوى ما، أو تستغرق وقتًا لمعالجته. ولسنا مسؤولين عن قرارات المنصات.',
        ],
      },
      {
        title: '4. محتواك',
        body: [
          'تحتفظ بكل حقوق محتواك، وتمنحنا الإذن اللازم لحفظه ومعالجته ونشره نيابةً عنك. وأنت مسؤول عن امتلاك حقوق كل ما تنشره، بما في ذلك الموسيقى والصور والعلامات التجارية، وعن الإفصاح عن المحتوى التجاري حيثما يلزم.',
        ],
      },
      {
        title: '5. الاستخدام المقبول',
        body: [
          'لا تستخدم الخدمة للرسائل المزعجة أو المحتوى غير القانوني أو المضايقة أو المحتوى المضلل أو البرمجيات الضارة أو لمخالفة قواعد أي منصة. يحق لنا إيقاف الحسابات المخالفة.',
        ],
      },
      {
        title: '6. الباقات المدفوعة',
        body: [
          'تُدفع الباقات مقدمًا عبر مزوّد الدفع. يمكنك الإلغاء في أي وقت من صفحة الفوترة، وتبقى الباقة فعّالة حتى نهاية الفترة المدفوعة.',
        ],
      },
      {
        title: '7. المصدر المفتوح',
        body: [
          'تعتمد {{brand}} على مشروع Postiz مفتوح المصدر، وتُوزَّع بموجب رخصة GNU Affero العامة الإصدار 3.0 (AGPL-3.0). يمكنك الحصول على الكود المصدري الكامل للنسخة التي نشغّلها من رابط «الكود المصدري» أسفل هذه الصفحة.',
        ],
      },
      {
        title: '8. إخلاء المسؤولية',
        body: [
          'تُقدَّم الخدمة «كما هي». وفي الحدود التي يسمح بها القانون، لسنا مسؤولين عن الخسائر غير المباشرة أو التبعية أو فوات الأرباح، أو عن محتوى ترفضه منصة أو تؤخره أو تحذفه.',
        ],
      },
      {
        title: '9. إنهاء الاتفاق',
        body: [
          'يمكنك التوقف عن استخدام الخدمة وحذف حسابك في أي وقت. ويحق لنا إيقاف الوصول أو إنهاؤه عند مخالفة هذه الشروط.',
        ],
      },
      {
        title: '10. التغييرات والتواصل',
        body: [
          'قد نحدّث هذه الشروط وسننشر النسخة الجديدة هنا. للاستفسارات: {{email}}. تخضع هذه الشروط لقوانين {{country}}.',
        ],
      },
    ],
  },
};
