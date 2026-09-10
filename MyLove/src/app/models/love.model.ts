export interface LoveQuestionnaire {
  creatorName: string;
  loverName: string;
}

export interface Question {
  id: number;
  text: string;
  positiveAnswers: string[];
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: '{lover}، {creator} رو دوست داری؟ ❤️',
    positiveAnswers: ['آره ❤️', 'صددرصد 😍', 'معلومه که آره 🥹']
  },
  {
    id: 2,
    text: 'اگه {creator} یه روز کامل کنارت باشه، خوشحال میشی؟ 🥰',
    positiveAnswers: ['حتماً 🥰', 'خیلی خوشحال میشم ✨', 'آره آره آره 💕']
  },
  {
    id: 3,
    text: 'حاضری با {creator} یه قرار عاشقانه بری؟ 🌹',
    positiveAnswers: ['حتماً 🌹', 'آره چرا نه 💕', 'حتماً حتماً ✨']
  },
  {
    id: 4,
    text: 'اگه {creator} ناراحت باشه، بغلش می‌کنی؟ 🫂',
    positiveAnswers: ['حتماً 🫂', 'آره خیلی 🥺', 'حتماً 💕']
  },
  {
    id: 5,
    text: 'فکر می‌کنی {creator} خاصه؟ ✨',
    positiveAnswers: ['خیلی خاصی ✨', 'آره خیلی خاص 💕', 'فوق‌العاده‌ای 😍']
  },
  {
    id: 6,
    text: 'حاضری با {creator} کلی خاطره قشنگ بسازی؟ 💕',
    positiveAnswers: ['حتماً 💕', 'آره خیلی 🥰', 'حتماً حتماً ✨']
  },
  {
    id: 7,
    text: 'اگه دوباره به دنیا بیای، باز هم {creator} رو انتخاب می‌کنی؟ 🥹',
    positiveAnswers: ['حتماً 🥹', 'البته که آره 💕', 'همیشه ✨']
  },
  {
    id: 8,
    text: 'خب... آخرین سؤال... عاشق {creator} هستی؟ 😍❤️',
    positiveAnswers: ['آره ❤️', 'خیلی عاشقتم 😍', 'همیشه 💕', 'صددرصد 🥹']
  }
];

export const FUNNY_MESSAGES = [
  'نه دیگه 😭',
  'مطمئنی؟ دوباره فکر کن 😂',
  'این گزینه مجاز نیست 😌',
  'دکمه اشتباهی رو انتخاب کردی 😏',
  'قلبت اجازه نموده ❤️',
  'اینو نمی‌تونی انتخاب کنی 😂',
  'یه بار دیگه امتحان کن... ولی فایده نداره 😈',
  'دستتو بردار از این دکمه 😂',
  'جدا جداً فکر کن 🤔',
  'قلبم نمی‌ذاره 😭❤️'
];
