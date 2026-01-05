'use client';

import { useEffect } from 'react';

// コンソールスタイル - 白系は使わない
const s = {
  green: 'color: #00ff00; font-family: monospace;',
  title: 'color: #00ff00; font-size: 16px; font-weight: bold;',
  cyan: 'color: #22d3ee; font-weight: bold;',
  text: 'color: #22d3ee;', // 白っぽくない
  muted: 'color: #0891b2;', // ダークシアン
  yellow: 'color: #fbbf24;',
  link: 'color: #60a5fa;',
};

// アスキーアートバナー
const ASCII_BANNER = `
%c
  ███████╗██╗   ██╗██╗  ██╗ █████╗ ██╗   ██╗ █████╗ 
  ██╔════╝██║   ██║██║ ██╔╝██╔══██╗╚██╗ ██╔╝██╔══██╗
  █████╗  ██║   ██║█████╔╝ ███████║ ╚████╔╝ ███████║
  ██╔══╝  ██║   ██║██╔═██╗ ██╔══██║  ╚██╔╝  ██╔══██║
  ██║     ╚██████╔╝██║  ██╗██║  ██║   ██║   ██║  ██║
  ╚═╝      ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
`;

// ウェルカムメッセージを表示
function showWelcome() {
  console.log(ASCII_BANNER, s.green);
  console.log('%c👋 ようこそ！ Welcome to my portfolio!', s.title);
  console.log('');
  console.log(
    '%c💡 fukayatti0() と入力して隠しコマンドをアンロック！',
    s.muted
  );
  console.log('');
}

// ヘルプメニュー
function showHelp() {
  console.log('');
  console.log('%c🎮 SECRET COMMANDS', s.title);
  console.log('%c─────────────────────────────────────────', s.muted);
  console.log(
    '%cfukayatti0.hint()     %c隠し機能のヒント 🤫',
    s.yellow,
    s.text
  );
  console.log('%cfukayatti0.about()    %c自己紹介', s.yellow, s.text);
  console.log('%cfukayatti0.skills()   %c技術スタック', s.yellow, s.text);
  console.log('%cfukayatti0.projects() %cプロジェクト', s.yellow, s.text);
  console.log('%cfukayatti0.contact()  %c連絡先', s.yellow, s.text);
  console.log('%cfukayatti0.energy()   %cエナドリタイム ⚡', s.yellow, s.text);
  console.log('%c─────────────────────────────────────────', s.muted);
  console.log('');
  return '🎮 シークレットコマンドがアンロックされました！';
}

// ヒント（コナミコマンド）
function showHint() {
  console.log('');
  console.log('%c🤫 このサイトには隠し機能があるよ...', s.cyan);
  console.log('');
  console.log('%cキーボードでこれを入力してみて：', s.text);
  console.log('%c↑ ↑ ↓ ↓ ← → ← → B A', s.yellow);
  console.log('');
  console.log('%c(そう、あの伝説のコマンドだよ... 🎮)', s.muted);
  console.log('');
  return '🤫 ヒントを見つけたね！';
}

// About
function showAbout() {
  console.log('');
  console.log('%c👋 ABOUT ME', s.title);
  console.log('%c─────────────────────────────────────────', s.muted);
  console.log('%c年齢:     %c15歳', s.cyan, s.text);
  console.log('%c学校:     %c茨城高専 (NIT Ibaraki)', s.cyan, s.text);
  console.log('%c所在地:   %c日本 🇯🇵', s.cyan, s.text);
  console.log(
    '%c役割:     %cStudent Developer & OSS Contributor',
    s.cyan,
    s.text
  );
  console.log('');
  console.log('%c学習中:', s.cyan);
  console.log('%c  • Rust × WebAssembly', s.text);
  console.log('%c  • Machine Learning', s.text);
  console.log('%c  • Cloud Native (Docker, K8s)', s.text);
  console.log('');
  console.log('%c座右の銘:', s.cyan);
  console.log('%c  "Manners maketh man." - Kingsman', s.muted);
  console.log('');
  return '👋 Nice to meet you!';
}

// Skills
function showSkills() {
  console.log('');
  console.log('%c🛠️ TECH STACK', s.title);
  console.log('%c─────────────────────────────────────────', s.muted);
  console.log('%cLanguages:', s.cyan);
  console.log('%c  Rust ████████████████████░░ 90%%', s.text);
  console.log('%c  TypeScript █████████████████████ 95%%', s.text);
  console.log('%c  Python ████████████████░░░░░░ 70%%', s.text);
  console.log('');
  console.log('%cFrontend:', s.cyan);
  console.log('%c  React / Next.js / Astro / Tailwind', s.text);
  console.log('');
  console.log('%cBackend & Infra:', s.cyan);
  console.log('%c  Node.js / Docker / Vercel / Cloudflare', s.text);
  console.log('');
  console.log('%cLearning:', s.cyan);
  console.log('%c  WebAssembly / ML / Kubernetes', s.muted);
  console.log('');
  return '🛠️ 技術スタックを表示しました！';
}

// Projects
function showProjects() {
  console.log('');
  console.log('%c📦 PROJECTS', s.title);
  console.log('%c─────────────────────────────────────────', s.muted);
  console.log('%cNITIC-Calendar-BOT', s.cyan);
  console.log('%c  高専の時間割をDiscordで通知', s.text);
  console.log('%c  → github.com/fukayatti/NITIC-Calendar-BOT', s.link);
  console.log('');
  console.log('%cThis Portfolio', s.cyan);
  console.log('%c  サイバーパンク風ポートフォリオ', s.text);
  console.log('%c  → fukayatti0.dev', s.link);
  console.log('');
  console.log('%cZenn & Qiita', s.cyan);
  console.log('%c  技術記事を執筆中', s.text);
  console.log('%c  → zenn.dev/fukayatti', s.link);
  console.log('');
  return '📦 プロジェクト一覧を表示しました！';
}

// Contact
function showContact() {
  console.log('');
  console.log('%c📬 CONTACT', s.title);
  console.log('%c─────────────────────────────────────────', s.muted);
  console.log('%cEmail:     %ccontact@fukayatti0.dev', s.cyan, s.link);
  console.log('%cGitHub:    %cgithub.com/fukayatti', s.cyan, s.link);
  console.log('%cInstagram: %c@fukayatti0', s.cyan, s.text);
  console.log('%cTwitter:   %c@fukayatti', s.cyan, s.text);
  console.log('%cWebsite:   %cfukayatti0.dev', s.cyan, s.link);
  console.log('');
  console.log('%cお気軽にご連絡ください！🚀', s.text);
  console.log('');
  return '📬 連絡先を表示しました！';
}

// Energy Drink - MONSTER缶のASCIIアート
function showEnergy() {
  console.log('');
  console.log('%c        ╭──────────────╮', s.muted);
  console.log('%c       ╱  ════════════  ╲', s.muted);
  console.log('%c      │  ░░░░░░░░░░░░░░  │', s.muted);
  console.log(
    '%c      │    %c║╲%c    %c╲%c   %c╲%c   │',
    s.muted,
    s.green,
    s.muted,
    s.green,
    s.muted,
    s.green,
    s.muted
  );
  console.log(
    '%c      │    %c║ ╲%c   %c ╲%c   %c╲%c  │',
    s.muted,
    s.green,
    s.muted,
    s.green,
    s.muted,
    s.green,
    s.muted
  );
  console.log(
    '%c      │    %c║  ╲%c   %c╲%c   %c ╲%c │',
    s.muted,
    s.green,
    s.muted,
    s.green,
    s.muted,
    s.green,
    s.muted
  );
  console.log(
    '%c      │    %c║   ╲%c  %c ╲%c   %c╲%c │',
    s.muted,
    s.green,
    s.muted,
    s.green,
    s.muted,
    s.green,
    s.muted
  );
  console.log(
    '%c      │    %c║    ╲%c  %c╲%c   %c ╲%c│',
    s.muted,
    s.green,
    s.muted,
    s.green,
    s.muted,
    s.green,
    s.muted
  );
  console.log(
    '%c      │    %c╚═════╝%c %c╚╝%c  %c╚╝%c│',
    s.muted,
    s.green,
    s.muted,
    s.green,
    s.muted,
    s.green,
    s.muted
  );
  console.log('%c      │                  │', s.muted);
  console.log(
    '%c      │  %cM%cΦ%cN%cS%cT%cE%cR%c        │',
    s.muted,
    s.green,
    s.green,
    s.green,
    s.green,
    s.green,
    s.green,
    s.green,
    s.muted
  );
  console.log('%c      │  %cE N E R G Y%c     │', s.muted, s.green, s.muted);
  console.log('%c      │                  │', s.muted);
  console.log('%c      │  %c炭酸飲料 / エナドリ%c │', s.muted, s.text, s.muted);
  console.log('%c       ╲________________╱', s.muted);
  console.log('');
  console.log('%c⚡ UNLEASH THE BEAST! ⚡', s.title);
  console.log('%c推し: Pipeline Punch / Ultra Paradise', s.muted);
  console.log('');
  return '⚡ UNLEASH THE BEAST!';
}

// グローバルにコマンドを登録
function registerCommands() {
  if (typeof window === 'undefined') return;

  const fukayatti0 = () => {
    showHelp();
    return '🎮 コマンド一覧を表示しました！';
  };

  fukayatti0.help = () => showHelp();
  fukayatti0.hint = () => showHint();
  fukayatti0.about = () => showAbout();
  fukayatti0.skills = () => showSkills();
  fukayatti0.projects = () => showProjects();
  fukayatti0.contact = () => showContact();
  fukayatti0.energy = () => showEnergy();

  (window as any).fukayatti0 = fukayatti0;
}

export default function ConsoleEasterEgg() {
  useEffect(() => {
    const timer = setTimeout(() => {
      showWelcome();
      registerCommands();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
