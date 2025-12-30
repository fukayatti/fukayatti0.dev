'use client';

import { useEffect } from 'react';

// コンソールスタイル
const styles = {
  title:
    'color: #00ff00; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00ff00;',
  subtitle: 'color: #818cf8; font-size: 14px;',
  info: 'color: #94a3b8; font-size: 12px;',
  command: 'color: #fbbf24; font-size: 12px; font-weight: bold;',
  hint: 'color: #f472b6; font-size: 12px; font-style: italic;',
  success: 'color: #4ade80; font-size: 12px;',
  ascii:
    'color: #00ff00; font-size: 10px; font-family: monospace; line-height: 1.2;',
};

// アスキーアート
const ASCII_ART = `
███████╗██╗   ██╗██╗  ██╗ █████╗ ██╗   ██╗ █████╗ ████████╗████████╗██╗ ██████╗ 
██╔════╝██║   ██║██║ ██╔╝██╔══██╗╚██╗ ██╔╝██╔══██╗╚══██╔══╝╚══██╔══╝██║██╔═████╗
█████╗  ██║   ██║█████╔╝ ███████║ ╚████╔╝ ███████║   ██║      ██║   ██║██║██╔██║
██╔══╝  ██║   ██║██╔═██╗ ██╔══██║  ╚██╔╝  ██╔══██║   ██║      ██║   ██║████╔╝██║
██║     ╚██████╔╝██║  ██╗██║  ██║   ██║   ██║  ██║   ██║      ██║   ██║╚██████╔╝
╚═╝      ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝      ╚═╝   ╚═╝ ╚═════╝ 
`;

// ウェルカムメッセージを表示
function showWelcome() {
  console.clear();
  console.log('%c' + ASCII_ART, styles.ascii);
  console.log('%c🚀 Welcome to my portfolio!', styles.title);
  console.log(
    '%cFull-Stack Developer | React | Next.js | TypeScript',
    styles.subtitle
  );
  console.log('');
  console.log(
    '%c💡 Tip: Type %cfukayatti0()%c to unlock secret commands!',
    styles.info,
    styles.command,
    styles.info
  );
  console.log('');
}

// ヘルプメッセージ
function showHelp() {
  console.log('');
  console.log(
    '%c╔═══════════════════════════════════════════════════╗',
    styles.ascii
  );
  console.log(
    '%c║           🎮 SECRET COMMANDS UNLOCKED 🎮          ║',
    styles.ascii
  );
  console.log(
    '%c╠═══════════════════════════════════════════════════╣',
    styles.ascii
  );
  console.log(
    '%c║                                                   ║',
    styles.ascii
  );
  console.log(
    '%c║  fukayatti0.help()     - Show this menu           ║',
    styles.ascii
  );
  console.log(
    '%c║  fukayatti0.hint()     - Get a secret hint 🤫     ║',
    styles.ascii
  );
  console.log(
    '%c║  fukayatti0.about()    - About me                 ║',
    styles.ascii
  );
  console.log(
    '%c║  fukayatti0.skills()   - My tech stack            ║',
    styles.ascii
  );
  console.log(
    '%c║  fukayatti0.contact()  - How to reach me          ║',
    styles.ascii
  );
  console.log(
    '%c║  fukayatti0.coffee()   - ☕                        ║',
    styles.ascii
  );
  console.log(
    '%c║                                                   ║',
    styles.ascii
  );
  console.log(
    '%c╚═══════════════════════════════════════════════════╝',
    styles.ascii
  );
  console.log('');
}

// ヒント（コナミコマンド）
function showHint() {
  console.log('');
  console.log('%c🤫 Psst... want to see something cool?', styles.hint);
  console.log('');
  console.log('%c   Try this on your keyboard:', styles.info);
  console.log('%c   ↑ ↑ ↓ ↓ ← → ← → B A', styles.command);
  console.log('');
  console.log("%c   (Yes, it's THAT code... 🎮)", styles.hint);
  console.log('');
}

// About
function showAbout() {
  console.log('');
  console.log('%c👋 About Me', styles.title);
  console.log(
    '%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    styles.info
  );
  console.log(
    "%cI'm Fukayatti, a Full-Stack Developer passionate about",
    styles.info
  );
  console.log(
    '%cbuilding modern web applications with cutting-edge tech.',
    styles.info
  );
  console.log('');
  console.log(
    '%c🎯 Focus: React, Next.js, TypeScript, Node.js',
    styles.subtitle
  );
  console.log('%c🌏 Location: Japan', styles.subtitle);
  console.log('%c💼 Open for opportunities!', styles.success);
  console.log('');
}

// Skills
function showSkills() {
  console.log('');
  console.log('%c🛠️ Tech Stack', styles.title);
  console.log(
    '%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    styles.info
  );
  console.log('');
  console.log('%c Frontend:', styles.subtitle);
  console.log(
    '%c   React ⚛️ | Next.js ▲ | TypeScript 📘 | Tailwind 🎨',
    styles.info
  );
  console.log('');
  console.log('%c Backend:', styles.subtitle);
  console.log('%c   Node.js 💚 | Python 🐍 | PostgreSQL 🐘', styles.info);
  console.log('');
  console.log('%c Tools:', styles.subtitle);
  console.log('%c   Git 🔀 | Docker 🐳 | Vercel ▲ | Figma 🎨', styles.info);
  console.log('');
}

// Contact
function showContact() {
  console.log('');
  console.log('%c📬 Get in Touch', styles.title);
  console.log(
    '%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    styles.info
  );
  console.log('');
  console.log('%c 🐙 GitHub:    https://github.com/fukayatti0', styles.info);
  console.log('%c 📸 Instagram: @fukayatti0', styles.info);
  console.log('%c 🌐 Website:   https://fukayatti0.dev', styles.info);
  console.log('');
  console.log('%c Feel free to reach out! 🚀', styles.success);
  console.log('');
}

// Coffee
function showCoffee() {
  const coffee = `
       ( (
        ) )
      ........
      |      |]
      \\      /
       '----'
  `;
  console.log('%c' + coffee, styles.ascii);
  console.log('%c☕ Coffee is the fuel of great code!', styles.hint);
  console.log('%c   Buy me a coffee? Just kidding... unless? 👀', styles.info);
  console.log('');
}

// グローバルにコマンドを登録
function registerCommands() {
  if (typeof window === 'undefined') return;

  const fukayatti0 = () => {
    showHelp();
    return '🎮 Secret commands unlocked! Check the console above.';
  };

  fukayatti0.help = () => {
    showHelp();
    return '📖 Help menu displayed!';
  };

  fukayatti0.hint = () => {
    showHint();
    return '🤫 Did you find the secret?';
  };

  fukayatti0.about = () => {
    showAbout();
    return '👋 Nice to meet you!';
  };

  fukayatti0.skills = () => {
    showSkills();
    return '🛠️ Tech stack displayed!';
  };

  fukayatti0.contact = () => {
    showContact();
    return "📬 Let's connect!";
  };

  fukayatti0.coffee = () => {
    showCoffee();
    return '☕';
  };

  // windowオブジェクトに登録
  (window as any).fukayatti0 = fukayatti0;
}

export default function ConsoleEasterEgg() {
  useEffect(() => {
    // 少し遅延させてからメッセージ表示（他のログの後に表示）
    const timer = setTimeout(() => {
      showWelcome();
      registerCommands();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return null; // 何も描画しない
}
