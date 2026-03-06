import { useState, useEffect, useRef } from "react";

const style = `*{box-sizing:border-box;margin:0;padding:0;}:root{--bg:#0a0a0f;--card:#13131a;--card2:#1a1a24;--accent:#e8ff47;--accent2:#ff6b35;--accent3:#47c9ff;--text:#f0f0f0;--muted:#666;--border:rgba(255,255,255,0.07);}body{background:var(--bg);color:var(--text);font-family:'Pretendard',sans-serif;}.app{max-width:430px;margin:0 auto;min-height:100vh;background:var(--bg);position:relative;overflow:hidden;}.app::before{content:'';position:fixed;top:-200px;left:-200px;width:500px;height:500px;background:radial-gradient(circle,rgba(232,255,71,0.08) 0%,transparent 70%);pointer-events:none;animation:pulse 4s ease-in-out infinite;}@keyframes pulse{0%,100%{transform:scale(1);}50%{transform:scale(1.1);}}@keyframes slideUp{from{transform:translateY(20px);opacity:0;}to{transform:translateY(0);opacity:1;}}@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}@keyframes pop{0%{transform:scale(0.8);opacity:0;}100%{transform:scale(1);opacity:1;}}.header{padding:52px 20px 16px;background:linear-gradient(180deg,rgba(232,255,71,0.05) 0%,transparent 100%);border-bottom:1px solid var(--border);}.header-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;}.logo{font-family:'Pretendard',sans-serif;font-size:26px;letter-spacing:2px;color:var(--accent);}.logo span{color:var(--text);}.avatar{width:38px;height:38px;background:linear-gradient(135deg,var(--accent),var(--accent2));border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;color:#000;cursor:pointer;}.greeting{font-size:13px;color:var(--muted);margin-bottom:4px;}.greeting strong{color:var(--text);font-size:20px;display:block;font-family:'Pretendard',sans-serif;letter-spacing:1px;font-weight:400;}.region-bar{padding:12px 20px 10px;border-bottom:1px solid var(--border);display:flex;gap:10px;align-items:stretch;}.region-trigger{display:flex;align-items:center;gap:8px;background:var(--card);border:1px solid var(--border);border-radius:12px;padding:10px 12px;cursor:pointer;flex:1;transition:border-color 0.2s;color:var(--text);min-width:0;}.region-trigger:hover{border-color:rgba(232,255,71,0.3);}.region-trigger.open{border-color:var(--accent);}.region-trigger-left{display:flex;align-items:center;gap:8px;flex:1;min-width:0;}.region-pin{width:26px;height:26px;background:rgba(232,255,71,0.12);border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;}.region-trigger-text{font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}.region-trigger-sub{font-size:10px;color:var(--muted);margin-top:1px;white-space:nowrap;}.region-chevron{color:var(--muted);transition:transform 0.25s;font-size:10px;flex-shrink:0;}.region-chevron.open{transform:rotate(180deg);}.date-trigger{display:flex;align-items:center;gap:8px;background:var(--card);border:1px solid var(--border);border-radius:12px;padding:10px 12px;cursor:pointer;flex:1;transition:border-color 0.2s,background 0.2s;color:var(--text);min-width:0;position:relative;}.date-trigger:hover{border-color:rgba(71,201,255,0.3);}.date-trigger.open{border-color:var(--accent3);}.date-trigger.active{border-color:var(--accent3);background:rgba(71,201,255,0.06);}.date-pin{width:26px;height:26px;background:rgba(71,201,255,0.12);border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;}.date-trigger-text{font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;}.date-trigger-sub{font-size:10px;color:var(--muted);margin-top:1px;white-space:nowrap;}.date-trigger-chevron{color:var(--muted);font-size:10px;flex-shrink:0;transition:transform 0.25s;}.date-trigger-chevron.open{transform:rotate(180deg);}.date-active-dot{position:absolute;top:8px;right:8px;width:7px;height:7px;background:var(--accent3);border-radius:50%;border:1.5px solid var(--card);}.date-panel{position:fixed;inset:0;z-index:60;display:flex;align-items:flex-end;animation:fadeIn 0.2s ease;}.date-panel-backdrop{position:absolute;inset:0;background:rgba(0,0,0,0.7);}.date-sheet{position:relative;background:var(--card);border-radius:24px 24px 0 0;width:100%;max-width:430px;margin:0 auto;padding:20px 20px 36px;border:1px solid var(--border);border-bottom:none;animation:slideUp 0.3s ease;z-index:1;}.date-sheet-handle{width:36px;height:4px;background:var(--border);border-radius:2px;margin:0 auto 18px;}.date-sheet-title{font-size:18px;font-weight:800;letter-spacing:-0.3px;margin-bottom:4px;}.date-sheet-sub{font-size:12px;color:var(--muted);margin-bottom:20px;}.cal-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}.cal-month-label{font-size:15px;font-weight:700;letter-spacing:-0.3px;}.cal-nav{display:flex;gap:4px;}.cal-nav-btn{width:32px;height:32px;background:var(--card2);border:1px solid var(--border);border-radius:8px;cursor:pointer;color:var(--text);display:flex;align-items:center;justify-content:center;font-size:13px;transition:all 0.15s;}.cal-nav-btn:hover{border-color:var(--accent3);color:var(--accent3);}.cal-nav-btn:disabled{opacity:0.3;cursor:default;}.cal-weekdays{display:grid;grid-template-columns:repeat(7,1fr);margin-bottom:6px;}.cal-weekday{text-align:center;font-size:11px;font-weight:600;color:var(--muted);padding:4px 0;}.cal-weekday:first-child{color:#ff6b6b;}.cal-weekday:last-child{color:var(--accent3);}.cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:3px;}.cal-day{aspect-ratio:1;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:500;cursor:pointer;transition:all 0.15s;color:var(--text);background:transparent;border:none;position:relative;}.cal-day:hover:not(.disabled):not(.selected){background:rgba(71,201,255,0.1);color:var(--accent3);}.cal-day.today{color:var(--accent);font-weight:800;}.cal-day.today::after{content:'';position:absolute;bottom:3px;left:50%;transform:translateX(-50%);width:4px;height:4px;border-radius:50%;background:var(--accent);}.cal-day.selected{background:var(--accent3);color:#000;font-weight:700;}.cal-day.disabled{color:var(--muted);opacity:0.3;cursor:default;}.cal-day.empty{cursor:default;}.cal-day.in-range{background:rgba(71,201,255,0.12);border-radius:0;}.cal-day.range-start{border-radius:9px 0 0 9px;}.cal-day.range-end{border-radius:0 9px 9px 0;}.date-quick-chips{display:flex;gap:7px;flex-wrap:wrap;margin:16px 0;}.date-chip{padding:6px 13px;border-radius:100px;border:1.5px solid var(--border);background:var(--card2);color:var(--muted);font-family:'Pretendard',sans-serif;font-size:12px;font-weight:600;cursor:pointer;transition:all 0.15s;}.date-chip:hover{border-color:rgba(71,201,255,0.4);color:var(--accent3);}.date-chip.selected{background:var(--accent3);color:#000;border-color:var(--accent3);}.date-confirm-btn{width:100%;padding:14px;border-radius:13px;background:var(--accent3);color:#000;font-family:'Pretendard',sans-serif;font-size:15px;font-weight:700;border:none;cursor:pointer;margin-top:6px;transition:all 0.2s;}.date-confirm-btn:active{transform:scale(0.98);}.date-reset-btn{width:100%;padding:12px;border-radius:13px;background:transparent;color:var(--muted);font-family:'Pretendard',sans-serif;font-size:13px;font-weight:600;border:1px solid var(--border);cursor:pointer;margin-top:8px;transition:all 0.2s;}.date-reset-btn:hover{color:var(--accent2);border-color:rgba(255,107,53,0.3);}.date-badge{display:inline-flex;align-items:center;gap:4px;background:rgba(71,201,255,0.1);border:1px solid rgba(71,201,255,0.25);border-radius:8px;padding:3px 8px;font-size:11px;color:var(--accent3);font-weight:600;margin-left:4px;vertical-align:middle;}.region-panel{position:fixed;inset:0;z-index:60;display:flex;align-items:flex-end;animation:fadeIn 0.2s ease;}.region-panel-backdrop{position:absolute;inset:0;background:rgba(0,0,0,0.7);}.region-sheet{position:relative;background:var(--card);border-radius:24px 24px 0 0;width:100%;max-width:430px;margin:0 auto;padding:20px 20px 36px;border:1px solid var(--border);border-bottom:none;animation:slideUp 0.3s ease;z-index:1;}.region-sheet-handle{width:36px;height:4px;background:var(--border);border-radius:2px;margin:0 auto 18px;}.region-sheet-title{font-family:'Pretendard',sans-serif;font-size:20px;letter-spacing:1px;margin-bottom:14px;color:var(--text);}.region-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:20px;}.region-item{background:var(--card2);border:1.5px solid var(--border);border-radius:12px;padding:10px 6px;text-align:center;cursor:pointer;transition:all 0.2s;}.region-item:hover{border-color:rgba(232,255,71,0.3);}.region-item.selected{border-color:var(--accent);background:rgba(232,255,71,0.08);}.region-item-emoji{font-size:20px;margin-bottom:4px;}.region-item-label{font-size:12px;font-weight:600;color:var(--text);}.region-item.selected .region-item-label{color:var(--accent);}.district-section{margin-top:4px;}.district-title{font-size:12px;color:var(--muted);margin-bottom:10px;font-weight:500;letter-spacing:0.5px;}.district-pills{display:flex;flex-wrap:wrap;gap:8px;}.district-pill{padding:6px 14px;border-radius:100px;border:1px solid var(--border);background:var(--card2);color:var(--muted);font-size:12px;font-weight:500;cursor:pointer;font-family:'Pretendard',sans-serif;transition:all 0.2s;}.district-pill:hover{border-color:rgba(232,255,71,0.3);color:var(--text);}.district-pill.selected{background:var(--accent);color:#000;border-color:var(--accent);}.region-confirm-btn{width:100%;padding:14px;border-radius:14px;background:var(--accent);color:#000;font-size:15px;font-weight:700;border:none;cursor:pointer;font-family:'Pretendard',sans-serif;margin-top:20px;transition:all 0.2s;}.region-confirm-btn:active{transform:scale(0.98);}.region-badge{display:inline-flex;align-items:center;gap:4px;background:rgba(232,255,71,0.1);border:1px solid rgba(232,255,71,0.25);border-radius:8px;padding:3px 8px;font-size:11px;color:var(--accent);font-weight:600;margin-left:8px;vertical-align:middle;}.region-bar{padding:14px 20px 10px;border-bottom:1px solid var(--border);}.region-trigger{display:flex;align-items:center;gap:8px;background:var(--card);border:1px solid var(--border);border-radius:12px;padding:10px 14px;cursor:pointer;width:100%;transition:border-color 0.2s;color:var(--text);}.region-trigger:hover{border-color:rgba(232,255,71,0.3);}.region-trigger.open{border-color:var(--accent);}.region-trigger-left{display:flex;align-items:center;gap:8px;flex:1;}.region-pin{width:28px;height:28px;background:rgba(232,255,71,0.12);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;}.region-trigger-text{font-size:14px;font-weight:500;}.region-trigger-sub{font-size:11px;color:var(--muted);margin-top:1px;}.region-chevron{color:var(--muted);transition:transform 0.25s;font-size:12px;}.region-chevron.open{transform:rotate(180deg);}.region-panel{position:fixed;inset:0;z-index:60;display:flex;align-items:flex-end;animation:fadeIn 0.2s ease;}.region-panel-backdrop{position:absolute;inset:0;background:rgba(0,0,0,0.7);}.region-sheet{position:relative;background:var(--card);border-radius:24px 24px 0 0;width:100%;max-width:430px;margin:0 auto;padding:20px 20px 36px;border:1px solid var(--border);border-bottom:none;animation:slideUp 0.3s ease;z-index:1;}.region-sheet-handle{width:36px;height:4px;background:var(--border);border-radius:2px;margin:0 auto 18px;}.region-sheet-title{font-family:'Pretendard',sans-serif;font-size:20px;letter-spacing:1px;margin-bottom:14px;color:var(--text);}.region-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:20px;}.region-item{background:var(--card2);border:1.5px solid var(--border);border-radius:12px;padding:10px 6px;text-align:center;cursor:pointer;transition:all 0.2s;}.region-item:hover{border-color:rgba(232,255,71,0.3);}.region-item.selected{border-color:var(--accent);background:rgba(232,255,71,0.08);}.region-item-emoji{font-size:20px;margin-bottom:4px;}.region-item-label{font-size:12px;font-weight:600;color:var(--text);}.region-item.selected .region-item-label{color:var(--accent);}.district-section{margin-top:4px;}.district-title{font-size:12px;color:var(--muted);margin-bottom:10px;font-weight:500;letter-spacing:0.5px;}.district-pills{display:flex;flex-wrap:wrap;gap:8px;}.district-pill{padding:6px 14px;border-radius:100px;border:1px solid var(--border);background:var(--card2);color:var(--muted);font-size:12px;font-weight:500;cursor:pointer;font-family:'Pretendard',sans-serif;transition:all 0.2s;}.district-pill:hover{border-color:rgba(232,255,71,0.3);color:var(--text);}.district-pill.selected{background:var(--accent);color:#000;border-color:var(--accent);}.region-confirm-btn{width:100%;padding:14px;border-radius:14px;background:var(--accent);color:#000;font-size:15px;font-weight:700;border:none;cursor:pointer;font-family:'Pretendard',sans-serif;margin-top:20px;transition:all 0.2s;}.region-confirm-btn:active{transform:scale(0.98);}.region-badge{display:inline-flex;align-items:center;gap:4px;background:rgba(232,255,71,0.1);border:1px solid rgba(232,255,71,0.25);border-radius:8px;padding:3px 8px;font-size:11px;color:var(--accent);font-weight:600;margin-left:8px;vertical-align:middle;}.nav{display:flex;padding:12px 20px;gap:8px;overflow-x:auto;scrollbar-width:none;}.nav::-webkit-scrollbar{display:none;}.nav-btn{padding:8px 16px;border-radius:100px;border:1px solid var(--border);background:transparent;color:var(--muted);font-family:'Pretendard',sans-serif;font-size:13px;cursor:pointer;white-space:nowrap;transition:all 0.2s;}.nav-btn.active{background:var(--accent);color:#000;border-color:var(--accent);font-weight:600;}.nav-btn:not(.active):hover{border-color:var(--accent);color:var(--accent);}.content{padding:16px 20px 100px;animation:fadeIn 0.3s ease;}.section-title{font-family:'Pretendard',sans-serif;font-size:22px;letter-spacing:1px;margin-bottom:14px;color:var(--text);display:flex;align-items:center;gap:8px;}.section-title::after{content:'';flex:1;height:1px;background:var(--border);}.card{background:var(--card);border-radius:16px;border:1px solid var(--border);margin-bottom:12px;overflow:hidden;cursor:pointer;transition:transform 0.2s,border-color 0.2s;animation:slideUp 0.3s ease both;}.card:hover{transform:translateY(-2px);border-color:rgba(232,255,71,0.2);}.card-header{padding:16px 16px 12px;display:flex;gap:12px;align-items:flex-start;}.card-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;}.card-info{flex:1;min-width:0;}.card-title{font-size:15px;font-weight:600;margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}.card-sub{font-size:12px;color:var(--muted);margin-bottom:8px;}.tags{display:flex;gap:6px;flex-wrap:wrap;}.tag{padding:3px 8px;border-radius:100px;font-size:11px;font-weight:500;background:rgba(255,255,255,0.06);color:var(--muted);}.tag.yellow{background:rgba(232,255,71,0.12);color:var(--accent);}.tag.orange{background:rgba(255,107,53,0.12);color:var(--accent2);}.tag.blue{background:rgba(71,201,255,0.12);color:var(--accent3);}.card-footer{padding:10px 16px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;}.member-count{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--muted);}.member-avatars{display:flex;}.member-avatar{width:22px;height:22px;border-radius:50%;border:2px solid var(--card);margin-left:-6px;font-size:9px;display:flex;align-items:center;justify-content:center;font-weight:700;}.member-avatar:first-child{margin-left:0;}.join-btn{padding:6px 14px;border-radius:100px;font-size:12px;font-weight:600;border:none;cursor:pointer;font-family:'Pretendard',sans-serif;transition:all 0.2s;}.join-btn.joined{background:rgba(232,255,71,0.1);color:var(--accent);border:1px solid rgba(232,255,71,0.3);}.join-btn.not-joined{background:var(--accent);color:#000;}.join-btn:active{transform:scale(0.95);}.detail-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.8);z-index:50;display:flex;align-items:flex-end;animation:fadeIn 0.2s ease;}.detail-sheet{background:var(--card);border-radius:24px 24px 0 0;width:100%;max-width:430px;margin:0 auto;padding:24px;max-height:85vh;overflow-y:auto;animation:slideUp 0.3s ease;border:1px solid var(--border);border-bottom:none;}.detail-handle{width:36px;height:4px;background:var(--border);border-radius:2px;margin:0 auto 20px;}.detail-icon-big{width:72px;height:72px;border-radius:20px;display:flex;align-items:center;justify-content:center;font-size:36px;margin-bottom:12px;}.detail-title{font-family:'Pretendard',sans-serif;font-size:28px;letter-spacing:1px;margin-bottom:4px;}.detail-desc{font-size:14px;color:var(--muted);line-height:1.6;margin:12px 0;}.detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:16px 0;}.detail-stat{background:var(--card2);border-radius:12px;padding:12px;border:1px solid var(--border);}.detail-stat-label{font-size:11px;color:var(--muted);margin-bottom:4px;}.detail-stat-value{font-size:15px;font-weight:600;}.detail-join-btn{width:100%;padding:16px;border-radius:14px;font-size:16px;font-weight:700;border:none;cursor:pointer;font-family:'Pretendard',sans-serif;margin-top:16px;transition:all 0.2s;}.detail-join-btn.not-joined{background:var(--accent);color:#000;}.detail-join-btn.joined{background:rgba(232,255,71,0.1);color:var(--accent);border:1px solid rgba(232,255,71,0.3);}.detail-join-btn:active{transform:scale(0.98);}.close-btn{position:absolute;top:16px;right:20px;width:32px;height:32px;background:var(--card2);border:1px solid var(--border);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--muted);font-size:18px;line-height:1;}.form-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:50;overflow-y:auto;animation:fadeIn 0.2s ease;}.form-sheet{background:var(--card);border-radius:24px 24px 0 0;margin-top:60px;min-height:calc(100vh - 60px);padding:24px;border:1px solid var(--border);border-bottom:none;animation:slideUp 0.3s ease;}.form-title{font-family:'Pretendard',sans-serif;font-size:28px;letter-spacing:1px;margin-bottom:24px;}.form-group{margin-bottom:16px;}.form-label{font-size:12px;color:var(--muted);margin-bottom:6px;font-weight:500;letter-spacing:0.5px;}.form-input,.form-textarea,.form-select{width:100%;background:var(--card2);border:1px solid var(--border);border-radius:12px;padding:12px 14px;color:var(--text);font-family:'Pretendard',sans-serif;font-size:14px;outline:none;transition:border-color 0.2s;appearance:none;}.form-input:focus,.form-textarea:focus,.form-select:focus{border-color:var(--accent);}.form-textarea{resize:none;height:90px;}.emoji-grid{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none;-ms-overflow-style:none;}.emoji-grid::-webkit-scrollbar{display:none;}.emoji-option{width:44px;height:44px;min-width:44px;border-radius:10px;background:var(--card2);border:1.5px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:20px;cursor:pointer;transition:all 0.15s;flex-shrink:0;}.emoji-option.selected{border-color:var(--accent);background:rgba(232,255,71,0.08);}.color-grid{display:flex;gap:8px;flex-wrap:wrap;margin-top:6px;}.color-option{width:36px;height:36px;border-radius:50%;cursor:pointer;border:2.5px solid transparent;transition:all 0.15s;}.color-option.selected{border-color:var(--text);}.submit-btn{width:100%;padding:16px;border-radius:14px;background:var(--accent);color:#000;font-size:16px;font-weight:700;border:none;cursor:pointer;font-family:'Pretendard',sans-serif;margin-top:8px;transition:all 0.2s;}.submit-btn:active{transform:scale(0.98);}.form-steps-bar{display:flex;gap:6px;margin-bottom:24px;align-items:center;}.form-step-segment{flex:1;height:4px;border-radius:2px;background:var(--border);transition:background 0.3s;}.form-step-segment.active{background:var(--accent);}.form-step-segment.done{background:rgba(232,255,71,0.4);}.form-step-label{font-size:12px;color:var(--muted);margin-bottom:18px;margin-top:-8px;display:flex;align-items:center;gap:6px;}.form-step-label strong{color:var(--text);font-weight:700;}.form-step-nav{display:grid;grid-template-columns:auto 1fr;gap:10px;margin-top:8px;}.form-step-nav.first-step{grid-template-columns:1fr;}.form-step-back{padding:14px 18px;border-radius:14px;background:var(--card2);border:1.5px solid var(--border);color:var(--text);font-family:'Pretendard',sans-serif;font-size:15px;font-weight:600;cursor:pointer;transition:all 0.2s;}.form-step-back:hover{border-color:var(--accent);}.form-step-next{padding:14px;border-radius:14px;background:var(--accent);color:#000;font-family:'Pretendard',sans-serif;font-size:15px;font-weight:700;border:none;cursor:pointer;transition:all 0.2s;}.form-step-next:active{transform:scale(0.98);}.form-step-next.disabled{background:var(--card2);color:var(--muted);border:1.5px solid var(--border);cursor:not-allowed;}.day-picker{display:flex;gap:6px;flex-wrap:wrap;margin-top:2px;}.day-btn{width:38px;height:38px;border-radius:10px;border:1.5px solid var(--border);background:var(--card2);color:var(--muted);font-family:'Pretendard',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:all 0.15s;display:flex;align-items:center;justify-content:center;}.day-btn:hover:not(.selected){border-color:rgba(232,255,71,0.3);color:var(--text);}.day-btn.selected{background:var(--accent);color:#000;border-color:var(--accent);}.day-btn.sun{color:#ff6b6b;}.day-btn.sun.selected{background:#ff6b6b;border-color:#ff6b6b;color:#fff;}.day-btn.sat{color:var(--accent3);}.day-btn.sat.selected{background:var(--accent3);border-color:var(--accent3);color:#000;}.duration-options{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:2px;}.duration-btn{padding:10px 6px;border-radius:11px;border:1.5px solid var(--border);background:var(--card2);color:var(--muted);font-family:'Pretendard',sans-serif;font-size:12px;font-weight:600;cursor:pointer;transition:all 0.15s;text-align:center;line-height:1.4;}.duration-btn:hover:not(.selected){border-color:rgba(163,71,255,0.35);color:var(--text);}.duration-btn.selected{background:rgba(163,71,255,0.12);border-color:#a347ff;color:#a347ff;}.duration-btn-sub{font-size:10px;opacity:0.7;display:block;margin-top:1px;}.date-range-row{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px;}.date-range-label{font-size:10px;color:var(--muted);margin-bottom:4px;font-weight:600;letter-spacing:0.3px;}.time-picker-row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;}.time-picker-select{background:var(--card2);border:1.5px solid var(--border);border-radius:11px;padding:11px 10px;color:var(--text);font-family:'Pretendard',sans-serif;font-size:14px;font-weight:600;outline:none;width:100%;cursor:pointer;text-align:center;transition:border-color 0.2s;appearance:none;-webkit-appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23666' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center;padding-right:28px;}.time-picker-select:focus{border-color:var(--accent);}.time-picker-select option{background:#1a1a24;}.time-picker-label{font-size:10px;color:var(--muted);margin-bottom:5px;font-weight:600;letter-spacing:0.3px;}.time-picker-colon{display:flex;align-items:flex-end;padding-bottom:10px;color:var(--muted);font-size:18px;font-weight:700;justify-content:center;}.date-drop-row{display:grid;grid-template-columns:2fr 1.5fr 1.5fr;gap:7px;margin-top:0;}.date-drop-select{background:var(--card2);border:1.5px solid var(--border);border-radius:11px;padding:11px 8px;color:var(--text);font-family:'Pretendard',sans-serif;font-size:13px;font-weight:500;outline:none;width:100%;cursor:pointer;text-align:center;transition:border-color 0.2s;appearance:none;-webkit-appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7' viewBox='0 0 10 7'%3E%3Cpath fill='%23666' d='M1 1l4 4 4-4'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 8px center;padding-right:22px;}.date-drop-select:focus{border-color:#a347ff;}.date-drop-select option{background:#1a1a24;}.form-field-error{font-size:11px;color:var(--accent2);font-weight:600;margin-top:5px;display:flex;align-items:center;gap:4px;animation:pop 0.2s ease;}.form-input.has-error,.form-select.has-error,.time-picker-select.has-error,.date-drop-select.has-error{border-color:var(--accent2) !important;box-shadow:0 0 0 3px rgba(255,107,53,0.1);}.form-group.has-error .day-picker .day-btn:not(.selected){border-color:rgba(255,107,53,0.4);}.form-group.has-error .duration-options .duration-btn:not(.selected){border-color:rgba(255,107,53,0.3);}.location-search-wrap{position:relative;}.location-search-input-row{display:flex;gap:8px;align-items:center;}.location-search-input{flex:1;background:var(--card2);border:1.5px solid var(--border);border-radius:12px;padding:12px 40px 12px 14px;color:var(--text);font-family:'Pretendard',sans-serif;font-size:14px;outline:none;transition:border-color 0.2s;width:100%;}.location-search-input:focus{border-color:var(--accent);}.location-search-input.has-error{border-color:var(--accent2) !important;}.location-search-icon{position:absolute;right:12px;top:50%;transform:translateY(-50%);font-size:16px;pointer-events:none;}.location-search-clear{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--muted);cursor:pointer;font-size:16px;padding:0;line-height:1;transition:color 0.15s;}.location-search-clear:hover{color:var(--text);}.location-suggestions{position:absolute;top:calc(100% + 6px);left:0;right:0;background:var(--card2);border:1px solid var(--border);border-radius:14px;z-index:300;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.4);animation:authFadeUp 0.15s ease;max-height:220px;overflow-y:auto;}.location-suggestion-item{display:flex;align-items:flex-start;gap:10px;padding:11px 14px;cursor:pointer;transition:background 0.12s;border-bottom:1px solid var(--border);}.location-suggestion-item:last-child{border-bottom:none;}.location-suggestion-item:hover{background:rgba(255,255,255,0.04);}.location-suggestion-item.keyboard-active{background:rgba(232,255,71,0.06);}.location-suggestion-icon{width:30px;height:30px;border-radius:8px;background:rgba(232,255,71,0.1);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;margin-top:1px;}.location-suggestion-name{font-size:13px;font-weight:600;margin-bottom:2px;color:var(--text);}.location-suggestion-name mark{background:transparent;color:var(--accent);font-weight:800;}.location-suggestion-addr{font-size:11px;color:var(--muted);line-height:1.4;}.location-suggestion-category{font-size:10px;color:var(--accent3);font-weight:600;margin-top:2px;}.location-no-results{padding:20px;text-align:center;font-size:13px;color:var(--muted);}.location-map-card{margin-top:10px;border-radius:14px;overflow:hidden;border:1.5px solid rgba(232,255,71,0.2);background:var(--card2);animation:authFadeUp 0.2s ease;}.location-map-visual{height:130px;position:relative;overflow:hidden;background:#0f1a0f;}.location-map-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(232,255,71,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(232,255,71,0.04) 1px,transparent 1px);background-size:24px 24px;}.location-map-roads{position:absolute;inset:0;}.location-map-pin{position:absolute;top:50%;left:50%;transform:translate(-50%,-60%);display:flex;flex-direction:column;align-items:center;filter:drop-shadow(0 2px 6px rgba(0,0,0,0.6));}.location-map-pin-dot{width:18px;height:18px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:var(--accent);border:3px solid #fff;box-shadow:0 2px 8px rgba(232,255,71,0.5);}.location-map-pin-shadow{width:10px;height:4px;border-radius:50%;background:rgba(0,0,0,0.3);margin-top:3px;}.location-map-pulse{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:40px;height:40px;border-radius:50%;background:rgba(232,255,71,0.12);border:1px solid rgba(232,255,71,0.25);animation:mapPulse 2s ease-in-out infinite;}@keyframes mapPulse{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:1;}50%{transform:translate(-50%,-50%) scale(1.4);opacity:0.4;}}.location-map-badge{position:absolute;top:10px;right:10px;background:rgba(0,0,0,0.7);backdrop-filter:blur(6px);border:1px solid var(--border);border-radius:8px;padding:4px 8px;font-size:10px;color:var(--muted);display:flex;align-items:center;gap:4px;}.location-map-info{padding:10px 14px 12px;display:flex;align-items:flex-start;justify-content:space-between;gap:8px;}.location-map-name{font-size:13px;font-weight:700;margin-bottom:2px;}.location-map-addr{font-size:11px;color:var(--muted);}.location-map-change{background:none;border:1px solid var(--border);border-radius:8px;padding:5px 10px;color:var(--muted);font-family:'Pretendard',sans-serif;font-size:11px;font-weight:600;cursor:pointer;transition:all 0.15s;flex-shrink:0;margin-top:2px;}.location-map-change:hover{border-color:var(--accent);color:var(--accent);}.location-detail-input{width:100%;background:var(--card2);border:1.5px solid var(--border);border-radius:11px;padding:11px 14px;color:var(--text);font-family:'Pretendard',sans-serif;font-size:13px;outline:none;transition:border-color 0.2s;margin-top:8px;}.location-detail-input:focus{border-color:rgba(71,201,255,0.5);}.location-detail-label{font-size:10px;color:var(--muted);font-weight:600;margin-bottom:4px;margin-top:10px;display:block;}.location-search-wrap{position:relative;}.location-search-input-row{display:flex;gap:8px;align-items:center;}.location-search-input{flex:1;background:var(--card2);border:1.5px solid var(--border);border-radius:12px;padding:12px 40px 12px 14px;color:var(--text);font-family:'Pretendard',sans-serif;font-size:14px;outline:none;transition:border-color 0.2s;width:100%;}.location-search-input:focus{border-color:var(--accent);}.location-search-input.has-error{border-color:var(--accent2) !important;}.location-search-icon{position:absolute;right:12px;top:50%;transform:translateY(-50%);font-size:16px;pointer-events:none;}.location-search-clear{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--muted);cursor:pointer;font-size:16px;padding:0;line-height:1;transition:color 0.15s;}.location-search-clear:hover{color:var(--text);}.location-suggestions{position:absolute;top:calc(100% + 6px);left:0;right:0;background:var(--card2);border:1px solid var(--border);border-radius:14px;z-index:300;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.4);animation:authFadeUp 0.15s ease;max-height:220px;overflow-y:auto;}.location-suggestion-item{display:flex;align-items:flex-start;gap:10px;padding:11px 14px;cursor:pointer;transition:background 0.12s;border-bottom:1px solid var(--border);}.location-suggestion-item:last-child{border-bottom:none;}.location-suggestion-item:hover{background:rgba(255,255,255,0.04);}.location-suggestion-item.keyboard-active{background:rgba(232,255,71,0.06);}.location-suggestion-icon{width:30px;height:30px;border-radius:8px;background:rgba(232,255,71,0.1);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;margin-top:1px;}.location-suggestion-name{font-size:13px;font-weight:600;margin-bottom:2px;color:var(--text);}.location-suggestion-name mark{background:transparent;color:var(--accent);font-weight:800;}.location-suggestion-addr{font-size:11px;color:var(--muted);line-height:1.4;}.location-suggestion-category{font-size:10px;color:var(--accent3);font-weight:600;margin-top:2px;}.location-no-results{padding:20px;text-align:center;font-size:13px;color:var(--muted);}.location-map-card{margin-top:10px;border-radius:14px;overflow:hidden;border:1.5px solid rgba(232,255,71,0.2);background:var(--card2);animation:authFadeUp 0.2s ease;}.location-map-visual{height:130px;position:relative;overflow:hidden;background:#0f1a0f;}.location-map-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(232,255,71,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(232,255,71,0.04) 1px,transparent 1px);background-size:24px 24px;}.location-map-roads{position:absolute;inset:0;}.location-map-pin{position:absolute;top:50%;left:50%;transform:translate(-50%,-60%);display:flex;flex-direction:column;align-items:center;filter:drop-shadow(0 2px 6px rgba(0,0,0,0.6));}.location-map-pin-dot{width:18px;height:18px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:var(--accent);border:3px solid #fff;box-shadow:0 2px 8px rgba(232,255,71,0.5);}.location-map-pin-shadow{width:10px;height:4px;border-radius:50%;background:rgba(0,0,0,0.3);margin-top:3px;}.location-map-pulse{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:40px;height:40px;border-radius:50%;background:rgba(232,255,71,0.12);border:1px solid rgba(232,255,71,0.25);animation:mapPulse 2s ease-in-out infinite;}@keyframes mapPulse{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:1;}50%{transform:translate(-50%,-50%) scale(1.4);opacity:0.4;}}.location-map-badge{position:absolute;top:10px;right:10px;background:rgba(0,0,0,0.7);backdrop-filter:blur(6px);border:1px solid var(--border);border-radius:8px;padding:4px 8px;font-size:10px;color:var(--muted);display:flex;align-items:center;gap:4px;}.location-map-info{padding:10px 14px 12px;display:flex;align-items:flex-start;justify-content:space-between;gap:8px;}.location-map-name{font-size:13px;font-weight:700;margin-bottom:2px;}.location-map-addr{font-size:11px;color:var(--muted);}.location-map-change{background:none;border:1px solid var(--border);border-radius:8px;padding:5px 10px;color:var(--muted);font-family:'Pretendard',sans-serif;font-size:11px;font-weight:600;cursor:pointer;transition:all 0.15s;flex-shrink:0;margin-top:2px;}.location-map-change:hover{border-color:var(--accent);color:var(--accent);}.location-detail-input{width:100%;background:var(--card2);border:1.5px solid var(--border);border-radius:11px;padding:11px 14px;color:var(--text);font-family:'Pretendard',sans-serif;font-size:13px;outline:none;transition:border-color 0.2s;margin-top:8px;}.location-detail-input:focus{border-color:rgba(71,201,255,0.5);}.location-detail-label{font-size:10px;color:var(--muted);font-weight:600;margin-bottom:4px;margin-top:10px;display:block;}.form-submit-errors{background:rgba(255,107,53,0.08);border:1px solid rgba(255,107,53,0.25);border-radius:12px;padding:12px 14px;margin-bottom:14px;animation:slideUp 0.25s ease;}.form-submit-errors-title{font-size:12px;font-weight:700;color:var(--accent2);margin-bottom:6px;}.form-submit-error-item{font-size:12px;color:rgba(255,107,53,0.85);line-height:1.8;display:flex;align-items:center;gap:6px;}.form-cal-overlay{position:fixed;inset:0;z-index:200;display:flex;align-items:flex-end;animation:fadeIn 0.18s ease;}.form-cal-backdrop{position:absolute;inset:0;background:rgba(0,0,0,0.75);}.form-cal-sheet{position:relative;z-index:1;background:var(--card);border-radius:24px 24px 0 0;width:100%;max-width:430px;margin:0 auto;padding:20px 20px 36px;border:1px solid var(--border);border-bottom:none;animation:slideUp 0.28s cubic-bezier(0.32,0.72,0,1);}.form-cal-handle{width:36px;height:4px;background:var(--border);border-radius:2px;margin:0 auto 16px;}.form-cal-title{font-size:15px;font-weight:800;margin-bottom:2px;letter-spacing:-0.3px;}.form-cal-sub{font-size:11px;color:var(--muted);margin-bottom:16px;}.form-cal-selected-row{display:flex;gap:8px;margin-bottom:14px;}.form-cal-selected-chip{flex:1;padding:9px 10px;border-radius:10px;background:var(--card2);border:1.5px solid var(--border);font-size:12px;text-align:center;line-height:1.4;}.form-cal-selected-chip.filled{border-color:#a347ff;background:rgba(163,71,255,0.08);color:#a347ff;font-weight:700;}.form-cal-selected-label{font-size:10px;color:var(--muted);margin-bottom:2px;}.form-cal-confirm{width:100%;padding:14px;border-radius:13px;background:#a347ff;color:#fff;font-family:'Pretendard',sans-serif;font-size:15px;font-weight:700;border:none;cursor:pointer;margin-top:14px;transition:all 0.2s;}.form-cal-confirm:disabled{opacity:0.35;cursor:not-allowed;}.form-cal-reset{width:100%;padding:11px;border-radius:13px;background:transparent;color:var(--muted);font-family:'Pretendard',sans-serif;font-size:12px;font-weight:600;border:1px solid var(--border);cursor:pointer;margin-top:8px;transition:all 0.2s;}.form-cal-mode-tabs{display:flex;gap:6px;margin-bottom:14px;}.form-cal-mode-tab{flex:1;padding:8px;border-radius:9px;background:var(--card2);border:1.5px solid var(--border);color:var(--muted);font-family:'Pretendard',sans-serif;font-size:12px;font-weight:600;cursor:pointer;transition:all 0.15s;}.form-cal-mode-tab.active{background:rgba(163,71,255,0.12);border-color:#a347ff;color:#a347ff;}.bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;padding:12px 20px 28px;background:rgba(10,10,15,0.9);backdrop-filter:blur(20px);border-top:1px solid var(--border);display:flex;justify-content:space-around;z-index:40;}.bottom-btn{display:flex;flex-direction:column;align-items:center;gap:4px;background:none;border:none;color:var(--muted);cursor:pointer;font-family:'Pretendard',sans-serif;font-size:10px;font-weight:500;transition:color 0.2s;padding:4px 16px;border-radius:12px;}.bottom-btn.active{color:var(--accent);}.bottom-btn svg{width:22px;height:22px;}.fab{width:52px;height:52px;border-radius:16px;background:var(--accent);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;margin-top:-20px;box-shadow:0 4px 20px rgba(232,255,71,0.4);transition:all 0.2s;position:relative;}.fab:active{transform:scale(0.93);}.fab svg{width:24px;height:24px;color:#000;}.my-card{background:var(--card);border-radius:16px;border:1px solid var(--border);padding:16px;margin-bottom:12px;display:flex;gap:14px;align-items:center;animation:slideUp 0.3s ease both;}.my-card-icon{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0;}.my-card-info{flex:1;}.my-card-title{font-size:15px;font-weight:600;margin-bottom:2px;}.my-card-meta{font-size:12px;color:var(--muted);}.next-badge{background:rgba(232,255,71,0.1);color:var(--accent);padding:4px 10px;border-radius:8px;font-size:11px;font-weight:600;white-space:nowrap;}.empty-state{text-align:center;padding:60px 20px;color:var(--muted);}.empty-state .big-emoji{font-size:48px;margin-bottom:12px;}.empty-state p{font-size:14px;line-height:1.6;}.toast{position:fixed;top:60px;left:50%;transform:translateX(-50%);background:var(--accent);color:#000;padding:10px 20px;border-radius:100px;font-weight:600;font-size:13px;z-index:100;animation:pop 0.3s ease,fadeOut 0.3s 1.7s ease forwards;white-space:nowrap;}@keyframes fadeOut{to{opacity:0;transform:translateX(-50%) translateY(-10px);}}.avatar-btn{position:relative;cursor:pointer;background:none;border:none;padding:0;}.avatar-btn .notif-dot{position:absolute;top:-1px;right:-1px;width:9px;height:9px;background:var(--accent2);border-radius:50%;border:2px solid var(--bg);}.mypage-overlay{position:fixed;inset:0;z-index:80;background:var(--bg);overflow-y:auto;animation:slideInRight 0.32s cubic-bezier(0.32,0.72,0,1);max-width:430px;margin:0 auto;}@keyframes slideInRight{from{transform:translateX(100%);opacity:0.6;}to{transform:translateX(0);opacity:1;}}.mp-cover{position:relative;height:200px;background:linear-gradient(135deg,#0f1a06 0%,#111118 40%,#0a0f1a 100%);overflow:hidden;}.mp-cover-pattern{position:absolute;inset:0;background-image:radial-gradient(circle at 20% 50%,rgba(232,255,71,0.12) 0%,transparent 50%),radial-gradient(circle at 80% 20%,rgba(255,107,53,0.1) 0%,transparent 40%),radial-gradient(circle at 60% 80%,rgba(71,201,255,0.08) 0%,transparent 40%);}.mp-cover-lines{position:absolute;inset:0;opacity:0.06;background-image:repeating-linear-gradient(
45deg,var(--accent) 0px,var(--accent) 1px,transparent 1px,transparent 28px
);}.mp-back-btn{position:absolute;top:52px;left:20px;width:36px;height:36px;background:rgba(0,0,0,0.4);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.12);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--text);font-size:18px;line-height:1;transition:background 0.2s;}.mp-back-btn:hover{background:rgba(255,255,255,0.1);}.mp-edit-btn{position:absolute;top:52px;right:20px;padding:7px 14px;background:rgba(0,0,0,0.4);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.15);border-radius:100px;cursor:pointer;color:var(--text);font-family:'Pretendard',sans-serif;font-size:12px;font-weight:600;transition:all 0.2s;}.mp-edit-btn.editing{background:var(--accent);color:#000;border-color:var(--accent);}.mp-profile-section{padding:0 20px;margin-top:-44px;position:relative;z-index:2;}.mp-avatar-wrap{position:relative;display:inline-block;margin-bottom:12px;}.mp-avatar-big{width:88px;height:88px;border-radius:24px;background:linear-gradient(135deg,var(--accent),var(--accent2));display:flex;align-items:center;justify-content:center;font-size:40px;border:3px solid var(--bg);box-shadow:0 8px 32px rgba(232,255,71,0.25);}.mp-avatar-edit{position:absolute;bottom:-4px;right:-4px;width:26px;height:26px;background:var(--card2);border:2px solid var(--bg);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:12px;}.mp-level-badge{display:inline-flex;align-items:center;gap:5px;background:rgba(232,255,71,0.1);border:1px solid rgba(232,255,71,0.25);border-radius:100px;padding:3px 10px;font-size:11px;color:var(--accent);font-weight:700;margin-bottom:8px;}.mp-name{font-family:'Pretendard',sans-serif;font-size:28px;letter-spacing:1px;margin-bottom:2px;display:flex;align-items:center;gap:8px;}.mp-handle{font-size:13px;color:var(--muted);margin-bottom:10px;}.mp-bio{font-size:14px;color:rgba(240,240,240,0.75);line-height:1.6;margin-bottom:14px;max-width:320px;}.mp-bio-input{width:100%;background:var(--card2);border:1px solid var(--border);border-radius:10px;padding:10px 12px;color:var(--text);font-family:'Pretendard',sans-serif;font-size:14px;outline:none;resize:none;height:72px;margin-bottom:14px;transition:border-color 0.2s;}.mp-bio-input:focus{border-color:var(--accent);}.mp-tags-row{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px;}.mp-sport-tag{padding:5px 12px;border-radius:100px;font-size:12px;font-weight:600;border:1.5px solid var(--border);background:var(--card);color:var(--muted);cursor:default;}.mp-sport-tag.active{border-color:var(--accent);background:rgba(232,255,71,0.08);color:var(--accent);}.mp-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:20px;}.mp-stat-card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:14px 10px;text-align:center;}.mp-stat-num{font-family:'Pretendard',sans-serif;font-size:28px;letter-spacing:0.5px;color:var(--accent);line-height:1;margin-bottom:3px;}.mp-stat-label{font-size:11px;color:var(--muted);font-weight:500;}.mp-section{padding:0 20px;margin-bottom:24px;}.mp-section-title{font-family:'Pretendard',sans-serif;font-size:16px;letter-spacing:1px;color:var(--muted);margin-bottom:12px;display:flex;align-items:center;gap:8px;}.mp-section-title::after{content:'';flex:1;height:1px;background:var(--border);}.heatmap{display:grid;grid-template-columns:repeat(13,1fr);gap:3px;}.heatmap-cell{aspect-ratio:1;border-radius:3px;transition:transform 0.1s;cursor:default;}.heatmap-cell:hover{transform:scale(1.3);}.mp-info-list{background:var(--card);border:1px solid var(--border);border-radius:16px;overflow:hidden;}.mp-info-row{display:flex;align-items:center;padding:14px 16px;border-bottom:1px solid var(--border);gap:12px;transition:background 0.15s;cursor:pointer;}.mp-info-row:last-child{border-bottom:none;}.mp-info-row:hover{background:rgba(255,255,255,0.02);}.mp-info-icon{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;}.mp-info-content{flex:1;}.mp-info-label{font-size:11px;color:var(--muted);margin-bottom:2px;}.mp-info-value{font-size:14px;font-weight:500;}.mp-info-input{font-size:14px;font-weight:500;background:none;border:none;outline:none;color:var(--text);font-family:'Pretendard',sans-serif;width:100%;border-bottom:1px dashed rgba(232,255,71,0.4);padding-bottom:2px;}.mp-info-arrow{color:var(--muted);font-size:12px;}.mp-settings-list{background:var(--card);border:1px solid var(--border);border-radius:16px;overflow:hidden;}.mp-setting-row{display:flex;align-items:center;padding:15px 16px;border-bottom:1px solid var(--border);gap:12px;cursor:pointer;transition:background 0.15s;}.mp-setting-row:last-child{border-bottom:none;}.mp-setting-row:hover{background:rgba(255,255,255,0.02);}.mp-setting-icon{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;}.mp-setting-label{flex:1;font-size:14px;font-weight:500;}.mp-setting-value{font-size:12px;color:var(--muted);}.mp-setting-arrow{color:var(--muted);font-size:12px;margin-left:4px;}.toggle{width:44px;height:24px;background:var(--card2);border-radius:100px;position:relative;cursor:pointer;border:1px solid var(--border);transition:background 0.2s;flex-shrink:0;}.toggle.on{background:var(--accent);border-color:var(--accent);}.toggle::after{content:'';position:absolute;top:2px;left:2px;width:18px;height:18px;background:var(--muted);border-radius:50%;transition:transform 0.2s,background 0.2s;}.toggle.on::after{transform:translateX(20px);background:#000;}.mp-progress-wrap{margin-top:10px;}.mp-progress-label{display:flex;justify-content:space-between;font-size:12px;color:var(--muted);margin-bottom:6px;}.mp-progress-bar{height:6px;background:var(--card2);border-radius:100px;overflow:hidden;}.mp-progress-fill{height:100%;border-radius:100px;background:linear-gradient(90deg,var(--accent),var(--accent2));transition:width 0.6s ease;}.achievement-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;}.achievement{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:12px 6px;text-align:center;position:relative;transition:transform 0.2s;}.achievement:hover{transform:translateY(-2px);}.achievement.locked{opacity:0.4;filter:grayscale(1);}.achievement-emoji{font-size:24px;margin-bottom:5px;}.achievement-name{font-size:10px;color:var(--muted);font-weight:600;line-height:1.3;}.achievement.earned{border-color:rgba(232,255,71,0.3);}.mp-logout-btn{width:100%;padding:15px;border-radius:14px;background:rgba(255,107,53,0.08);border:1px solid rgba(255,107,53,0.2);color:var(--accent2);font-family:'Pretendard',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s;margin-top:8px;}.mp-logout-btn:hover{background:rgba(255,107,53,0.15);}
.sub-nav { background: var(--card); border-bottom: 1px solid var(--border); padding-top: 0; }
.sub-nav .nav-btn.sub { font-size: 12px; padding: 5px 12px; background: var(--card2); border-radius: 100px; border: 1.5px solid var(--border); color: var(--muted); }
.sub-nav .nav-btn.sub.active { background: rgba(232,255,71,0.12); border-color: var(--accent); color: var(--accent); }
.sport-pick-btn { background: var(--card2) !important; border: 1.5px solid var(--border) !important; color: var(--text); }
.sport-pick-btn.chosen { border-color: var(--accent) !important; }
.sp-modal-overlay { position: fixed; inset: 0; z-index: 200; display: flex; align-items: flex-end; max-width: 430px; margin: 0 auto; }
.sp-modal-bg { position: absolute; inset: 0; background: rgba(0,0,0,0.7); }
.sp-modal-sheet { position: relative; z-index: 1; background: var(--card); border-radius: 24px 24px 0 0; width: 100%; max-height: 85vh; display: flex; flex-direction: column; border: 1px solid var(--border); border-bottom: none; animation: sheetUp 0.28s cubic-bezier(0.32,0.72,0,1); }
@keyframes sheetUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
.sp-modal-header { padding: 16px 20px 10px; flex-shrink: 0; }
.sp-modal-handle { width: 36px; height: 4px; background: var(--border); border-radius: 2px; margin: 0 auto 14px; }
.sp-modal-title { font-size: 17px; font-weight: 800; margin-bottom: 12px; }
.sp-modal-search { width: 100%; background: var(--card2); border: 1.5px solid var(--border); border-radius: 12px; padding: 10px 14px 10px 36px; color: var(--text); font-family: inherit; font-size: 14px; outline: none; }
.sp-modal-search:focus { border-color: var(--accent); }
.sp-search-wrap { position: relative; }
.sp-search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 14px; }
.sp-modal-body { flex: 1; overflow-y: auto; padding: 12px 20px; }
.sp-group { margin-bottom: 16px; }
.sp-group-label { font-size: 11px; font-weight: 700; color: var(--muted); letter-spacing: 0.5px; padding-bottom: 7px; border-bottom: 1px solid var(--border); margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
.sp-subs { display: flex; flex-wrap: wrap; gap: 7px; }
.sp-sub-btn { padding: 7px 14px; border-radius: 100px; background: var(--card2); border: 1.5px solid var(--border); color: var(--text); font-family: inherit; font-size: 13px; font-weight: 500; cursor: pointer; white-space: nowrap; transition: all 0.15s; }
.sp-sub-btn:hover { border-color: var(--accent); color: var(--accent); }
.sp-sub-btn.selected { background: rgba(232,255,71,0.1); border-color: var(--accent); color: var(--accent); font-weight: 700; }
.sp-modal-footer { padding: 12px 20px 0; border-top: 1px solid var(--border); flex-shrink: 0; }
.sp-done-btn { width: 100%; padding: 13px; border-radius: 13px; background: var(--accent); color: #000; font-family: inherit; font-size: 15px; font-weight: 800; border: none; cursor: pointer; }
.sp-empty { text-align: center; color: var(--muted); font-size: 13px; padding: 24px 0; }

.chat-room-list{padding:0;}
.chat-room-item{display:flex;align-items:center;gap:12px;padding:14px 20px;border-bottom:1px solid var(--border);cursor:pointer;transition:background .15s;}
.chat-room-item:active{background:var(--card2);}
.chat-room-icon{width:46px;height:46px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;}
.chat-room-info{flex:1;min-width:0;}
.chat-room-name{font-size:14px;font-weight:700;margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.chat-room-last{font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.chat-room-meta{display:flex;flex-direction:column;align-items:flex-end;gap:4px;flex-shrink:0;}
.chat-room-time{font-size:11px;color:var(--muted);}
.chat-unread{background:var(--accent);color:#000;font-size:10px;font-weight:800;border-radius:100px;padding:2px 7px;min-width:18px;text-align:center;}
.chat-screen{position:fixed;inset:0;z-index:80;background:var(--bg);display:flex;flex-direction:column;max-width:430px;margin:0 auto;}
.chat-header{display:flex;align-items:center;gap:12px;padding:14px 20px;border-bottom:1px solid var(--border);background:var(--bg);flex-shrink:0;}
.chat-back{width:32px;height:32px;border-radius:50%;background:var(--card2);border:none;color:var(--text);font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.chat-header-icon{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;}
.chat-header-info{flex:1;min-width:0;}
.chat-header-name{font-size:15px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.chat-header-members{font-size:11px;color:var(--muted);}
.chat-messages{flex:1;overflow-y:auto;padding:16px 20px;display:flex;flex-direction:column;gap:12px;}
.chat-messages::-webkit-scrollbar{display:none;}
.chat-day-divider{text-align:center;font-size:11px;color:var(--muted);margin:4px 0;position:relative;}
.chat-day-divider::before{content:'';position:absolute;top:50%;left:0;right:0;height:1px;background:var(--border);z-index:0;}
.chat-day-divider span{position:relative;z-index:1;background:var(--bg);padding:0 10px;}
.chat-msg-row{display:flex;gap:8px;align-items:flex-end;}
.chat-msg-row.mine{flex-direction:row-reverse;}
.chat-avatar{width:30px;height:30px;border-radius:50%;background:var(--card2);display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;}
.chat-bubble-wrap{display:flex;flex-direction:column;gap:3px;max-width:68%;}
.chat-msg-row.mine .chat-bubble-wrap{align-items:flex-end;}
.chat-sender{font-size:11px;color:var(--muted);margin-bottom:2px;}
.chat-bubble{padding:9px 13px;border-radius:16px;font-size:14px;line-height:1.5;word-break:break-word;}
.chat-bubble.them{background:var(--card2);border-bottom-left-radius:4px;color:var(--text);}
.chat-bubble.mine{background:var(--accent);border-bottom-right-radius:4px;color:#000;font-weight:500;}
.chat-msg-time{font-size:10px;color:var(--muted);align-self:flex-end;margin-bottom:2px;flex-shrink:0;}
.chat-input-bar{display:flex;align-items:center;gap:8px;padding:10px 16px 24px;border-top:1px solid var(--border);background:var(--bg);flex-shrink:0;}
.chat-input{flex:1;background:var(--card2);border:1.5px solid var(--border);border-radius:22px;padding:10px 16px;color:var(--text);font-family:'Pretendard',sans-serif;font-size:14px;outline:none;resize:none;max-height:100px;line-height:1.4;}
.chat-input:focus{border-color:var(--accent);}
.chat-send-btn{width:38px;height:38px;border-radius:50%;background:var(--accent);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:opacity .2s;}
.chat-send-btn:disabled{opacity:.35;cursor:default;}
.chat-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;flex:1;gap:10px;color:var(--muted);font-size:13px;}
.chat-empty-icon{font-size:36px;}

/* ── Auth Screens ───────────────────────────────────────── */
.auth-screen{min-height:100vh;background:var(--bg);display:flex;flex-direction:column;max-width:430px;margin:0 auto;padding:0 24px;overflow-y:auto;}
.btn-primary{width:100%;padding:16px;border-radius:14px;background:var(--accent);color:#000;font-family:'Pretendard',sans-serif;font-size:16px;font-weight:700;border:none;cursor:pointer;transition:all 0.2s;margin-bottom:12px;display:block;}
.btn-primary:active{transform:scale(0.98);}
.btn-primary.btn-loading{opacity:0.7;cursor:default;}
.btn-secondary{width:100%;padding:15px;border-radius:14px;background:transparent;color:var(--text);font-family:'Pretendard',sans-serif;font-size:15px;font-weight:600;border:1.5px solid var(--border);cursor:pointer;transition:all 0.2s;display:block;}
.btn-secondary:hover{border-color:rgba(255,255,255,0.2);}
/* Splash */
.splash{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:40px 0;text-align:center;position:relative;}
.splash-orbs{position:absolute;inset:0;pointer-events:none;overflow:hidden;}
.orb{position:absolute;border-radius:50%;filter:blur(60px);}
.orb-1{width:300px;height:300px;background:rgba(232,255,71,0.15);top:-100px;left:-80px;}
.orb-2{width:250px;height:250px;background:rgba(255,107,53,0.1);top:30%;right:-60px;}
.orb-3{width:200px;height:200px;background:rgba(71,201,255,0.1);bottom:10%;left:20%;}
.splash-ring{width:120px;height:120px;border-radius:32px;background:linear-gradient(135deg,var(--accent),var(--accent2));display:flex;align-items:center;justify-content:center;margin-bottom:32px;box-shadow:0 20px 60px rgba(232,255,71,0.3);position:relative;z-index:1;}
.splash-logo-inner{font-family:'Pretendard',sans-serif;font-size:40px;font-weight:900;color:#000;letter-spacing:2px;}
.splash-title{font-family:'Pretendard',sans-serif;font-size:32px;font-weight:400;line-height:1.3;margin-bottom:12px;letter-spacing:-0.5px;position:relative;z-index:1;}
.splash-title span{color:var(--accent);font-weight:900;}
.splash-sub{font-size:15px;color:var(--muted);line-height:1.6;margin-bottom:36px;position:relative;z-index:1;}
.splash-features{display:flex;flex-direction:column;gap:12px;width:100%;margin-bottom:40px;position:relative;z-index:1;}
.splash-feature{display:flex;align-items:center;gap:14px;background:var(--card);border:1px solid var(--border);border-radius:14px;padding:14px;text-align:left;animation:slideUp 0.4s ease both;}
.splash-feature-icon{width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;}
.splash-feature-title{font-size:14px;font-weight:700;margin-bottom:2px;}
.splash-feature-text{font-size:12px;color:var(--muted);line-height:1.4;}
.splash-cta{width:100%;position:relative;z-index:1;}
/* Auth form */
.auth-form-wrap{padding:60px 0 40px;display:flex;flex-direction:column;min-height:100vh;}
.auth-header{display:flex;align-items:center;gap:12px;margin-bottom:32px;}
.auth-back{width:36px;height:36px;background:var(--card2);border:1px solid var(--border);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--text);font-size:18px;line-height:1;transition:background 0.2s;flex-shrink:0;}
.auth-back:hover{background:var(--card);}
.auth-title{font-family:'Pretendard',sans-serif;font-size:26px;letter-spacing:1px;font-weight:400;}
/* Social login */
.social-btns{display:flex;flex-direction:column;gap:10px;margin-bottom:24px;}
.social-btn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:14px;border-radius:14px;font-family:'Pretendard',sans-serif;font-size:15px;font-weight:600;cursor:pointer;border:1.5px solid var(--border);transition:all 0.2s;}
.social-btn-kakao{background:#FEE500;color:#191919;border-color:#FEE500;}
.social-btn-kakao:hover{background:#FFD800;}
.social-btn-google{background:var(--card2);color:var(--text);}
.social-btn-google:hover{border-color:rgba(255,255,255,0.2);}
.social-btn-icon{width:22px;height:22px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.auth-divider{display:flex;align-items:center;gap:12px;font-size:12px;color:var(--muted);margin:4px 0 20px;}
.auth-divider::before,.auth-divider::after{content:'';flex:1;height:1px;background:var(--border);}
/* Fields */
.auth-field{margin-bottom:16px;}
.auth-label{font-size:12px;color:var(--muted);font-weight:600;letter-spacing:0.5px;display:block;margin-bottom:7px;}
.auth-input-wrap{position:relative;}
.auth-input-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:16px;pointer-events:none;}
.auth-input{width:100%;background:var(--card2);border:1.5px solid var(--border);border-radius:13px;padding:13px 44px;color:var(--text);font-family:'Pretendard',sans-serif;font-size:15px;outline:none;transition:all 0.2s;}
.auth-input:focus{border-color:var(--accent);background:rgba(232,255,71,0.03);}
.auth-input.error{border-color:var(--accent2);}
.auth-input.valid{border-color:rgba(71,255,163,0.5);}
.auth-error{font-size:11px;color:var(--accent2);font-weight:600;margin-top:5px;display:flex;align-items:center;gap:4px;}
.pw-toggle{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:var(--muted);font-size:18px;padding:4px;line-height:1;}
.forgot-link{text-align:right;margin-bottom:20px;}
.forgot-link button{background:none;border:none;color:var(--muted);font-family:'Pretendard',sans-serif;font-size:12px;cursor:pointer;text-decoration:underline;}
.auth-footer-link{text-align:center;font-size:13px;color:var(--muted);margin-top:24px;}
.auth-footer-link button{background:none;border:none;color:var(--accent);font-family:'Pretendard',sans-serif;font-size:13px;font-weight:600;cursor:pointer;margin-left:6px;}
/* Forgot */
.forgot-screen{padding:60px 0 40px;min-height:100vh;}
.forgot-sent-wrap{display:flex;flex-direction:column;align-items:center;text-align:center;padding:80px 0 40px;}
.forgot-sent-icon{font-size:64px;margin-bottom:20px;}
.forgot-sent-title{font-family:'Pretendard',sans-serif;font-size:28px;letter-spacing:1px;margin-bottom:8px;}
.forgot-sent-sub{font-size:14px;color:var(--muted);margin-bottom:8px;}
.forgot-sent-email{font-size:15px;font-weight:700;color:var(--accent);margin-bottom:24px;}
.resend-link{background:none;border:none;color:var(--muted);font-family:'Pretendard',sans-serif;font-size:13px;text-decoration:underline;cursor:pointer;margin-top:12px;width:100%;text-align:center;display:block;}
/* Signup steps */
.step-indicators{display:flex;gap:8px;margin-bottom:10px;}
.step-dot{width:8px;height:8px;border-radius:50%;background:var(--border);transition:all 0.3s;}
.step-dot.active{background:var(--accent);width:24px;border-radius:4px;}
.step-dot.done{background:rgba(232,255,71,0.4);}
.step-label{font-size:12px;color:var(--muted);margin-bottom:24px;}
.sport-picker{display:flex;flex-wrap:wrap;gap:8px;}
.terms-row{display:flex;align-items:flex-start;gap:10px;padding:10px 0;cursor:pointer;}
.terms-check{width:20px;height:20px;border-radius:6px;border:1.5px solid var(--border);background:var(--card2);flex-shrink:0;margin-top:1px;transition:all 0.15s;display:flex;align-items:center;justify-content:center;}
.terms-check.checked{background:var(--accent);border-color:var(--accent);}
.terms-check.checked::after{content:'✓';color:#000;font-size:11px;font-weight:700;}
.terms-text{font-size:13px;color:var(--muted);line-height:1.5;}
.terms-text a{color:var(--accent);text-decoration:none;}
/* Success */
.auth-success{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;text-align:center;padding:40px 0;}
.success-ring{width:100px;height:100px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--accent2));display:flex;align-items:center;justify-content:center;margin-bottom:28px;box-shadow:0 16px 48px rgba(232,255,71,0.35);font-size:44px;line-height:1;}
.success-title{font-family:'Pretendard',sans-serif;font-size:36px;letter-spacing:2px;margin-bottom:12px;}
.success-sub{font-size:15px;color:var(--muted);line-height:1.7;margin-bottom:40px;}
@keyframes authFadeUp{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
`;

const COLORS = ["#e8ff47", "#ff6b35", "#47c9ff", "#ff47a3", "#a347ff", "#47ffa3"];
const EMOJIS = ["", "", "", "", "", "⚽", "", "", "", "️", "", ""];

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
const SPORT_TREE = [
  { id: "team",    label: "팀 구기",     icon: "⚽", subs: ["축구","풋살","농구","야구","배구","족구"] },
  { id: "racket",  label: "라켓 스포츠", icon: "🎾", subs: ["테니스","배드민턴","탁구","스쿼시","라켓볼","패들"] },
  { id: "running", label: "러닝/라이딩", icon: "🏃", subs: ["러닝","조깅","마라톤","로드바이크","인라인","스케이트보드"] },
  { id: "health",  label: "헬스/웰니스", icon: "💪", subs: ["헬스","크로스핏","요가","필라테스","폴댄스"] },
  { id: "outdoor", label: "등산/아웃도어",icon: "⛰️", subs: ["등산","트레킹","캠핑/글램핑","플로깅"] },
  { id: "extreme", label: "익스트림",    icon: "🧗", subs: ["클라이밍","볼더링"] },
  { id: "water",   label: "수상",        icon: "🏊", subs: ["수영","서핑","다이빙","패들보드","수상스키"] },
  { id: "ice",     label: "빙상",        icon: "⛸️", subs: ["스키/보드","아이스스케이트"] },
  { id: "martial", label: "무도/격투기", icon: "🥋", subs: ["유도","태권도","주짓수","복싱","검도","펜싱"] },
  { id: "leisure", label: "레저 스포츠", icon: "🎳", subs: ["골프","볼링","당구","양궁","사격"] },
];
const ALL_SPORTS = SPORT_TREE.flatMap(g => g.subs);

const REGIONS = [
  { id: "all", label: "전체", emoji: "️" },
  { id: "seoul", label: "서울", emoji: "️", districts: ["강남", "강북", "마포", "홍대", "여의도", "성동", "송파", "용산"] },
  { id: "gyeonggi", label: "경기", emoji: "", districts: ["수원", "성남", "고양", "용인", "부천", "안산"] },
  { id: "incheon", label: "인천", emoji: "✈️", districts: ["미추홀", "연수", "남동", "부평"] },
  { id: "busan", label: "부산", emoji: "", districts: ["해운대", "수영", "남구", "동래"] },
  { id: "daegu", label: "대구", emoji: "", districts: ["중구", "수성", "달서", "북구"] },
  { id: "daejeon", label: "대전", emoji: "", districts: ["유성", "서구", "중구"] },
  { id: "gwangju", label: "광주", emoji: "", districts: ["동구", "서구", "북구"] },
];

const initMeetups = [
  { id: 1, title: "한강 새벽 러닝", emoji: "", color: "#e8ff47", category: "러닝", region: "seoul", district: "여의도", desc: "한강변을 따라 달리는 새벽 러닝 소모임입니다. 초보자부터 중급자까지 함께해요!", location: "여의도 한강공원", day: "화,목,토", time: "06:00", maxMembers: 20, members: ["김", "이", "박", "최", "정"], difficulty: "초급" },
  { id: 2, title: "MTB 라이딩 크루", emoji: "", color: "#ff6b35", category: "사이클", region: "gyeonggi", district: "고양", desc: "산악 자전거로 주말마다 코스를 달리는 모임. 안전 장비 필수!", location: "북한산", day: "토,일", time: "08:00", maxMembers: 15, members: ["유", "강", "조", "윤"], difficulty: "중급" },
  { id: 3, title: "힐링 수영 클래스", emoji: "", color: "#47c9ff", category: "수영", region: "seoul", district: "강남", desc: "수영을 배우고 싶은 분들을 위한 친절한 소모임. 강사 경력 10년!", location: "강남구 공공수영장", day: "월,수,금", time: "07:00", maxMembers: 10, members: ["한", "오", "서"], difficulty: "입문" },
  { id: 4, title: "요가 & 명상 클래스", emoji: "", color: "#a347ff", category: "요가", region: "seoul", district: "마포", desc: "몸과 마음의 균형을 찾는 요가 소모임. 매트 대여 가능합니다.", location: "마포구 공원 야외", day: "화,목", time: "19:00", maxMembers: 12, members: ["권", "황", "안", "임", "홍", "신"], difficulty: "초급" },
  { id: 5, title: "복싱 핏니스 클럽", emoji: "", color: "#ff47a3", category: "격투", region: "seoul", district: "성동", desc: "복싱 기술보다 체력 향상에 집중! 스트레스 날리는 최고의 운동.", location: "성동구 복싱 체육관", day: "월,수,금", time: "20:00", maxMembers: 18, members: ["전", "류", "남", "심"], difficulty: "중급" },
  { id: 6, title: "해운대 비치 런", emoji: "", color: "#47c9ff", category: "러닝", region: "busan", district: "해운대", desc: "해운대 백사장을 달리는 특별한 러닝 경험! 일몰과 함께 달려요.", location: "해운대 해수욕장", day: "토,일", time: "06:30", maxMembers: 25, members: ["이", "박", "최"], difficulty: "초급" },
  { id: 7, title: "수원 자전거 동호회", emoji: "", color: "#47ffa3", category: "사이클", region: "gyeonggi", district: "수원", desc: "수원 화성을 자전거로 일주하는 주말 라이딩 모임.", location: "수원 화성", day: "일", time: "09:00", maxMembers: 30, members: ["김", "정", "강", "조", "윤", "박"], difficulty: "초급" },
];

function App() {
  const [toast, setToast] = useState(null);
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2000); };

  // ── Auth ──────────────────────────────────────────────────
  const [authScreen, setAuthScreen] = useState("splash"); // splash | login | signup | forgot | forgot-sent | success
  const [signupStep, setSignupStep] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "", showPw: false });
  const [loginErrors, setLoginErrors] = useState({});
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  const handleForgotSubmit = () => {
    if (!forgotEmail.includes("@")) { setForgotError("올바른 이메일을 입력해주세요"); return; }
    setForgotError("");
    setForgotLoading(true);
    setTimeout(() => { setForgotLoading(false); setAuthScreen("forgot-sent"); }, 1400);
  };
  const [signupForm, setSignupForm] = useState({
    name: "", email: "", password: "", confirmPw: "",
    phone: "", birthYear: "", gender: "",
    sports: [], region: "seoul", terms: false, privacy: false,
    showPw: false, showConfirm: false,
  });
  const [signupErrors, setSignupErrors] = useState({});

  const validateLogin = () => {
    const e = {};
    if (!loginForm.email.includes("@")) e.email = "올바른 이메일을 입력해주세요";
    if (loginForm.password.length < 1) e.password = "비밀번호를 입력해주세요";
    setLoginErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleLogin = () => {
    if (!validateLogin()) return;
    setAuthLoading(true);
    setTimeout(() => { setAuthLoading(false); setIsLoggedIn(true); }, 1400);
  };
  const validateSignupStep = (step) => {
    const e = {};
    if (step === 1) {
      if (!signupForm.name.trim()) e.name = "이름을 입력해주세요";
      if (!signupForm.email.includes("@")) e.email = "올바른 이메일을 입력해주세요";
      if (signupForm.password.length < 8) e.password = "비밀번호는 8자 이상이어야 해요";
      if (signupForm.password !== signupForm.confirmPw) e.confirmPw = "비밀번호가 일치하지 않아요";
    }
    if (step === 2) {
      if (!signupForm.phone.trim()) e.phone = "전화번호를 입력해주세요";
      if (!signupForm.birthYear.trim()) e.birthYear = "출생연도를 입력해주세요";
      if (!signupForm.gender) e.gender = "성별을 선택해주세요";
      if (!signupForm.terms) e.terms = "이용약관에 동의해주세요";
    }
    if (step === 3) {
      if (signupForm.sports.length === 0) e.sports = "관심 운동을 1개 이상 선택해주세요";
    }
    setSignupErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleSignupNext = () => {
    if (!validateSignupStep(signupStep)) return;
    if (signupStep < 3) { setSignupStep(s => s + 1); return; }
    setAuthLoading(true);
    setTimeout(() => { setAuthLoading(false); setAuthScreen("success"); }, 1400);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthScreen("splash");
    setMypageOpen(false);
    setLoginForm({ email: "", password: "", showPw: false });
    showToast("👋 로그아웃 되었어요");
  };

  // ── App ──────────────────────────────────────────────────
  const [tab, setTab] = useState("explore");

  // ── Chat ──────────────────────────────────────────────────
  const [chatRoom, setChatRoom] = useState(null); // 열린 채팅방 meetup 객체
  const [chatInput, setChatInput] = useState("");
  const [chatLogs, setChatLogs] = useState(() => {
    const now = new Date();
    const fmt = (d) => `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
    const today = `${now.getFullYear()}.${now.getMonth()+1}.${now.getDate()}`;
    return {
      1: {
        unread: 2,
        messages: [
          { id:1, sender:"이민준", avatar:"🏃", text:"오늘 날씨 완전 좋다! 달리기 딱이네요 ㅎㅎ", time:"06:12", date:today, mine:false },
          { id:2, sender:"박소연", avatar:"🌸", text:"맞아요! 저도 기대되요~", time:"06:15", date:today, mine:false },
          { id:3, sender:"나", avatar:"💪", text:"저도 오늘 꼭 참석할게요!", time:"06:18", date:today, mine:true },
          { id:4, sender:"김태현", avatar:"⚡", text:"오늘 6시에 여의도 정문 앞에서 봬요!", time:"06:20", date:today, mine:false },
          { id:5, sender:"이민준", avatar:"🏃", text:"👍", time:"06:21", date:today, mine:false },
        ]
      },
      3: {
        unread: 1,
        messages: [
          { id:1, sender:"한지수", avatar:"🏊", text:"오늘 수영 수업 예정대로 진행됩니다!", time:"07:00", date:today, mine:false },
          { id:2, sender:"나", avatar:"💪", text:"감사합니다! 참석할게요", time:"07:05", date:today, mine:true },
        ]
      },
    };
  });
  const chatInputRef = useRef(null);
  const chatBottomRef = useRef(null);

  const sendMessage = () => {
    const text = chatInput.trim();
    if (!text || !chatRoom) return;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
    const today = `${now.getFullYear()}.${now.getMonth()+1}.${now.getDate()}`;
    const newMsg = { id: Date.now(), sender:"나", avatar:"💪", text, time, date:today, mine:true };
    setChatLogs(prev => ({
      ...prev,
      [chatRoom.id]: {
        unread: 0,
        messages: [...(prev[chatRoom.id]?.messages || []), newMsg],
      }
    }));
    setChatInput("");
    setTimeout(() => chatBottomRef.current?.scrollIntoView({ behavior:"smooth" }), 50);
  };
  const [catGroup, setCatGroup] = useState(null);  // SPORT_TREE id or null = 전체
  const [catSub, setCatSub] = useState(null);       // sub sport string or null
  const [formSportModalOpen, setFormSportModalOpen] = useState(false);
  const [mpSportModalOpen, setMpSportModalOpen] = useState(false);
  const [sportSearch, setSportSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedDistrict, setSelectedDistrict] = useState("전체");
  const [regionOpen, setRegionOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // null = no filter
  const [calViewYear, setCalViewYear] = useState(() => new Date().getFullYear());
  const [calViewMonth, setCalViewMonth] = useState(() => new Date().getMonth());
  const [quickChip, setQuickChip] = useState(null); // "today"|"tomorrow"|"thisWeek"|"thisWeekend"|"nextWeek"

  const today = new Date();
  today.setHours(0,0,0,0);
  const maxDate = new Date(today);
  maxDate.setMonth(maxDate.getMonth() + 6);

  const QUICK_CHIPS = [
    { key: "today",      label: "오늘" },
    { key: "tomorrow",   label: "내일" },
    { key: "thisWeek",   label: "이번 주" },
    { key: "thisWeekend",label: "이번 주말" },
    { key: "nextWeek",   label: "다음 주" },
  ];

  const getChipDate = (key) => {
    const d = new Date(today);
    if (key === "today")       return d;
    if (key === "tomorrow")    { d.setDate(d.getDate()+1); return d; }
    if (key === "thisWeek")    return d; // range: today ~ this Sunday
    if (key === "thisWeekend") {
      const day = d.getDay();
      const diff = day <= 6 ? 6 - day : 0;
      d.setDate(d.getDate() + diff); return d;
    }
    if (key === "nextWeek")    { d.setDate(d.getDate() + (7 - d.getDay() + 1)); return d; }
    return d;
  };

  // Returns [startDate, endDate] for a chip key
  const getChipRange = (key) => {
    if (key === "thisWeek") {
      const start = new Date(today);
      const end = new Date(today);
      const dayOfWeek = today.getDay(); // 0=Sun
      end.setDate(today.getDate() + (6 - dayOfWeek)); // this Sunday
      end.setHours(0,0,0,0);
      return [start, end];
    }
    if (key === "thisWeekend") {
      const d = new Date(today);
      const dayOfWeek = d.getDay();
      const satDiff = (6 - dayOfWeek + 7) % 7 || 7;
      const sat = new Date(today); sat.setDate(today.getDate() + satDiff);
      const sun = new Date(sat);   sun.setDate(sat.getDate() + 1);
      return [sat, sun];
    }
    if (key === "nextWeek") {
      const d = new Date(today);
      const dayOfWeek = d.getDay();
      const nextMon = new Date(today); nextMon.setDate(today.getDate() + (8 - dayOfWeek) % 7 || 7);
      const nextSun = new Date(nextMon); nextSun.setDate(nextMon.getDate() + 6);
      return [nextMon, nextSun];
    }
    const single = getChipDate(key);
    return [single, single];
  };

  // Check if a date falls within thisWeek/thisWeekend/nextWeek range
  const isInChipRange = (date) => {
    if (!quickChip || !["thisWeek","thisWeekend","nextWeek"].includes(quickChip)) return false;
    const [start, end] = getChipRange(quickChip);
    return date >= start && date <= end;
  };
  const isChipRangeStart = (date) => {
    if (!quickChip || !["thisWeek","thisWeekend","nextWeek"].includes(quickChip)) return false;
    return date.getTime() === getChipRange(quickChip)[0].getTime();
  };
  const isChipRangeEnd = (date) => {
    if (!quickChip || !["thisWeek","thisWeekend","nextWeek"].includes(quickChip)) return false;
    return date.getTime() === getChipRange(quickChip)[1].getTime();
  };

  const formatDateLabel = (d) => {
    if (!d) return "날짜 선택";
    return `${d.getMonth()+1}월 ${d.getDate()}일`;
  };

  const KO_MONTHS = ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"];
  const KO_WEEKDAYS = ["일","월","화","수","목","금","토"];

  const getDaysInMonth = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month+1, 0).getDate();
    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= totalDays; d++) cells.push(d);
    return cells;
  };

  const canPrevMonth = () => {
    const prev = new Date(calViewYear, calViewMonth - 1, 1);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), 1);
    return prev >= todayStart;
  };
  const canNextMonth = () => {
    const next = new Date(calViewYear, calViewMonth + 1, 1);
    return next <= new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
  };

  const handleCalDay = (day) => {
    if (!day) return;
    const clicked = new Date(calViewYear, calViewMonth, day);
    clicked.setHours(0,0,0,0);
    if (clicked < today || clicked > maxDate) return;
    setSelectedDate(clicked);
    setQuickChip(null);
  };

  const handleQuickChip = (key) => {
    setQuickChip(key);
    const d = getChipDate(key);
    setSelectedDate(d);
    setCalViewYear(d.getFullYear());
    setCalViewMonth(d.getMonth());
  };

  const applyDateFilter = () => { setDateOpen(false); };
  const resetDateFilter = () => { setSelectedDate(null); setQuickChip(null); setDateOpen(false); };
  const [meetups, setMeetups] = useState(initMeetups);
  const [joined, setJoined] = useState(new Set());
  const [selected, setSelected] = useState(null);
  const [creating, setCreating] = useState(false);
  const [mypageOpen, setMypageOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [notifPush, setNotifPush] = useState(true);
  const [notifChat, setNotifChat] = useState(false);
  const [profile, setProfile] = useState({
    name: "김런닝",
    handle: "@running_kim",
    bio: "달리기를 통해 매일 성장하는 중  한강을 사랑하는 서울러. 풀코스 완주가 목표!",
    sports: ["러닝", "요가", "수영"],
    age: "28",
    gender: "남성",
    phone: "010-1234-5678",
    email: "running@fitcrew.kr",
    region: "서울 · 마포",
  });
  const [editProfile, setEditProfile] = useState({ ...profile });
  const [avatarImg, setAvatarImg] = useState(null);

  // Load persisted avatar on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("profile:avatar");
      if (saved) setAvatarImg(saved);
    } catch (_) {}
  }, []);
  const [editingHandle, setEditingHandle] = useState(false);
  const [handleDraft, setHandleDraft] = useState("");
  const [handleError, setHandleError] = useState("");

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { showToast("⚠️ 5MB 이하 이미지만 업로드 가능해요"); return; }
    if (!file.type.startsWith("image/")) { showToast("⚠️ 이미지 파일만 업로드 가능해요"); return; }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target.result;
      setAvatarImg(base64);
      try {
        localStorage.setItem("profile:avatar", base64);
      } catch (_) {}
    };
    reader.readAsDataURL(file);
  };

  const openHandleEdit = () => {
    const current = profile.handle.replace(/^@/, "");
    setHandleDraft(current);
    setHandleError("");
    setEditingHandle(true);
  };

  const confirmHandle = () => {
    const val = handleDraft.replace(/^@/, "");
    if (!/^[a-z0-9_.]*$/.test(val)) {
      setHandleError("영어 소문자, 숫자, _, . 만 입력 가능해요");
      return;
    }
    if (val.length === 0) { setHandleError("아이디를 입력해주세요"); return; }
    setProfile(p => ({ ...p, handle: "@" + val }));
    setEditingHandle(false);
    showToast("✅ 인스타그램 아이디가 저장됐어요");
  };

  const SPORT_OPTIONS = ["러닝", "사이클", "수영", "요가", "헬스", "구기종목", "격투", "클라이밍"];

  // ── Stats derived from joined meetups ──────────────────────────────
  // 총 운동 횟수: joined 소모임의 요일 수 × 최근 12주(84일) 동안 해당 요일이 몇 번 들어있는지 합산
  const totalWorkouts = (() => {
    const joinedMeetups = meetups.filter(m => joined.has(m.id));
    if (joinedMeetups.length === 0) return 0;
    let count = 0;
    const now = new Date(); now.setHours(0,0,0,0);
    for (let d = 0; d < 84; d++) {
      const day = new Date(now); day.setDate(now.getDate() - d);
      const dayName = ["일","월","화","수","목","금","토"][day.getDay()];
      joinedMeetups.forEach(m => {
        if (m.day && m.day.includes(dayName)) count++;
      });
    }
    return count;
  })();

  // 총 km: 카테고리별 평균 거리(km/회) × 총 운동 횟수로 추정
  const KM_PER_SESSION = { "러닝": 5, "사이클": 20, "수영": 1.5, "요가": 0, "헬스": 0, "격투": 0, "클라이밍": 0, "배드민턴": 0, "테니스": 0, "골프": 3, "구기종목": 2, "등산": 6 };
  const totalKm = (() => {
    const joinedMeetups = meetups.filter(m => joined.has(m.id));
    if (joinedMeetups.length === 0) return 0;
    let km = 0;
    const now = new Date(); now.setHours(0,0,0,0);
    for (let d = 0; d < 84; d++) {
      const day = new Date(now); day.setDate(now.getDate() - d);
      const dayName = ["일","월","화","수","목","금","토"][day.getDay()];
      joinedMeetups.forEach(m => {
        if (m.day && m.day.includes(dayName)) {
          km += KM_PER_SESSION[m.category] || 0;
        }
      });
    }
    return Math.round(km);
  })();

  // ── 히트맵: 최근 91일 × joined 소모임 활동 요일 기반 ────────────────
  const heatmapData = (() => {
    const joinedMeetups = meetups.filter(m => joined.has(m.id));
    const now = new Date(); now.setHours(0,0,0,0);
    return Array.from({ length: 91 }, (_, i) => {
      const day = new Date(now); day.setDate(now.getDate() - (90 - i));
      const dayName = ["일","월","화","수","목","금","토"][day.getDay()];
      const hits = joinedMeetups.filter(m => m.day && m.day.includes(dayName)).length;
      if (hits === 0) return 0;
      if (hits === 1) return 1;
      if (hits === 2) return 2;
      return 3;
    });
  })();

  const heatColors = ["#1a1a24", "rgba(232,255,71,0.25)", "rgba(232,255,71,0.55)", "#e8ff47"];

  const achievements = [
    { emoji: "", name: "첫 참석", earned: true },
    { emoji: "", name: "러닝 5회", earned: true },
    { emoji: "", name: "10일 연속", earned: true },
    { emoji: "", name: "새벽 러너", earned: true },
    { emoji: "", name: "100km", earned: false },
    { emoji: "", name: "소모임장", earned: false },
    { emoji: "⚡", name: "스피드킹", earned: false },
    { emoji: "", name: "마인드풀", earned: false },
  ];

  const todayForForm = new Date();
  const formMaxDate = new Date(todayForForm);
  formMaxDate.setMonth(formMaxDate.getMonth() + 6);

  const [formErrors, setFormErrors] = useState({});
  const [formStep, setFormStep] = useState(1); // 1 = 기본정보, 2 = 활동정보, 3 = 완료
  const [formCalOpen, setFormCalOpen] = useState(null);
  const [formCalViewYear, setFormCalViewYear] = useState(todayForForm.getFullYear());
  const [formCalViewMonth, setFormCalViewMonth] = useState(todayForForm.getMonth());
  const [locationQuery, setLocationQuery] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [locationSelected, setLocationSelected] = useState(null); // { name, address, detail }
  const [locationDetail, setLocationDetail] = useState("");
  const [locationFocused, setLocationFocused] = useState(false);
  const [locationKbIndex, setLocationKbIndex] = useState(-1);

  const PLACE_DB = [
    { name:"여의도 한강공원", address:"서울 영등포구 여의동로 330", category:"공원/야외", icon:"" },
    { name:"뚝섬 한강공원", address:"서울 광진구 강변북로 139", category:"공원/야외", icon:"" },
    { name:"반포 한강공원", address:"서울 서초구 신반포로11길 40", category:"공원/야외", icon:"" },
    { name:"북한산 국립공원", address:"서울 강북구 삼각산로 95", category:"등산/트레킹", icon:"⛰️" },
    { name:"관악산 등산로", address:"서울 관악구 신림동 산56-1", category:"등산/트레킹", icon:"⛰️" },
    { name:"남산 순환로", address:"서울 중구 소파로 120", category:"등산/트레킹", icon:"⛰️" },
    { name:"강남구 공공수영장", address:"서울 강남구 논현로 534", category:"실내 스포츠", icon:"" },
    { name:"마포구 공원 야외", address:"서울 마포구 월드컵북로 396", category:"공원/야외", icon:"" },
    { name:"성동구 복싱 체육관", address:"서울 성동구 왕십리로 410", category:"실내 스포츠", icon:"" },
    { name:"수원 화성 자전거길", address:"경기도 수원시 팔달구 행궁로 11", category:"자전거도로", icon:"" },
    { name:"해운대 해수욕장", address:"부산 해운대구 해운대해변로 264", category:"해변/야외", icon:"" },
    { name:"광안리 해수욕장", address:"부산 수영구 광안해변로 219", category:"해변/야외", icon:"" },
    { name:"코엑스 몰 스포츠센터", address:"서울 강남구 봉은사로 524", category:"실내 스포츠", icon:"️" },
    { name:"올림픽공원 조깅로", address:"서울 송파구 올림픽로 424", category:"공원/야외", icon:"" },
    { name:"서울숲 공원", address:"서울 성동구 뚝섬로 273", category:"공원/야외", icon:"" },
    { name:"인천 승기천 자전거길", address:"인천 남동구 승기로 130", category:"자전거도로", icon:"" },
    { name:"대구 앞산 등산로", address:"대구 남구 앞산순환로 477", category:"등산/트레킹", icon:"⛰️" },
    { name:"광주 운암체육관", address:"광주 북구 운암동 452", category:"실내 스포츠", icon:"️" },
    { name:"제주 한라산 등산로", address:"제주 서귀포시 토평동 산15-1", category:"등산/트레킹", icon:"⛰️" },
    { name:"청계천 산책로", address:"서울 종로구 청계천로 530", category:"공원/야외", icon:"" },
    { name:"홍대 클라이밍짐", address:"서울 마포구 와우산로 94", category:"실내 스포츠", icon:"" },
    { name:"강남 헬스클럽", address:"서울 강남구 테헤란로 37", category:"실내 스포츠", icon:"️" },
    { name:"잠실 실내체육관", address:"서울 송파구 올림픽로 25", category:"실내 스포츠", icon:"" },
    { name:"보라매공원 운동장", address:"서울 동작구 보라매공원길 38", category:"공원/야외", icon:"" },
    { name:"경의선 숲길", address:"서울 마포구 연남동 258-11", category:"공원/야외", icon:"" },
  ];

  const searchPlaces = (q) => {
    if (!q.trim()) { setLocationSuggestions([]); return; }
    const lower = q.toLowerCase().replace(/\s/g,"");
    const results = PLACE_DB.filter(p =>
      p.name.toLowerCase().replace(/\s/g,"").includes(lower) ||
      p.address.replace(/\s/g,"").includes(lower) ||
      p.category.includes(q)
    ).slice(0, 6);
    setLocationSuggestions(results);
    setLocationKbIndex(-1);
  };

  const selectPlace = (place) => {
    setLocationSelected(place);
    setLocationQuery(place.name);
    setLocationSuggestions([]);
    setLocationFocused(false);
    setLocationDetail("");
    setFormErrors(e => ({...e, location: undefined}));
    setForm(f => ({...f, location: place.name, locationAddress: place.address}));
  };

  const [form, setForm] = useState({
    title: "", category: "러닝", desc: "", location: "",
    region: "seoul", district: "강남",
    days: [],
    timeAmPm: "오전", timeHour: "6", timeMin: "00",
    maxMembers: 10, emoji: "", color: "#e8ff47",
    difficulty: "초급", duration: "1개월",
    startYear:  String(todayForForm.getFullYear()),
    startMonth: String(todayForForm.getMonth() + 1),
    startDay:   String(todayForForm.getDate()),
    endYear: "", endMonth: "", endDay: "",
  });


  const toggleJoin = (id, e) => {
    e?.stopPropagation();
    setJoined(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); showToast("🚫 소모임 참석 취소"); }
      else { next.add(id); showToast("✅ 소모임 참석 완료"); }
      return next;
    });
  };

  const handleCreate = () => {
    // ── Validate required fields ──────────────────────────
    const errors = {};
    if (!form.title.trim())     errors.title    = "소모임 이름을 입력해주세요";
    if (!locationSelected)      errors.location = "활동 장소를 검색하여 선택해주세요";
    if (form.days.length === 0) errors.days     = "활동 요일을 1개 이상 선택해주세요";
    // time: always set (has defaults), but check maxMembers
    if (!form.maxMembers || parseInt(form.maxMembers) < 2) errors.maxMembers = "최대 인원을 2명 이상으로 설정해주세요";
    if (form.duration === "직접입력") {
      if (!form.startYear || !form.startMonth || !form.startDay) errors.startDate = "시작일을 선택해주세요";
      if (!form.endYear   || !form.endMonth   || !form.endDay)   errors.endDate   = "종료일을 선택해주세요";
    }
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    setFormErrors({});

    const hourNum = parseInt(form.timeHour);
    const hour24 = form.timeAmPm === "오전"
      ? (hourNum === 12 ? 0 : hourNum)
      : (hourNum === 12 ? 12 : hourNum + 12);
    const timeStr = `${String(hour24).padStart(2,"0")}:${form.timeMin}`;
    const startDateStr = form.startYear && form.startMonth && form.startDay
      ? `${form.startYear}-${form.startMonth.padStart(2,"0")}-${form.startDay.padStart(2,"0")}` : "";
    const endDateStr = form.endYear && form.endMonth && form.endDay
      ? `${form.endYear}-${form.endMonth.padStart(2,"0")}-${form.endDay.padStart(2,"0")}` : "";
    const newMeetup = {
      ...form,
      id: Date.now(),
      maxMembers: parseInt(form.maxMembers),
      members: ["나"],
      day: form.days.join(","),
      time: timeStr,
      startDate: startDateStr,
      endDate: endDateStr,
    };
    setMeetups(prev => [newMeetup, ...prev]);
    setJoined(prev => new Set([...prev, newMeetup.id]));
    setCreating(false);
    setFormErrors({});
    setFormStep(1);
    setLocationQuery(""); setLocationSelected(null); setLocationDetail("");
    setForm({
      title: "", category: "러닝", desc: "", location: "",
      region: "seoul", district: "강남",
      days: [],
      timeAmPm: "오전", timeHour: "6", timeMin: "00",
      maxMembers: 10, emoji: "", color: "#e8ff47",
      difficulty: "초급", duration: "1개월",
      startYear:  String(todayForForm.getFullYear()),
      startMonth: String(todayForForm.getMonth() + 1),
      startDay:   String(todayForForm.getDate()),
      endYear: "", endMonth: "", endDay: "",
    });
    showToast("🎉 소모임이 생성되었어요");
  };

  const filtered = meetups.filter(m => {
    const activeGroup = catGroup ? SPORT_TREE.find(g => g.id === catGroup) : null;
    const catMatch = !catGroup
      ? true
      : catSub
        ? m.category === catSub
        : (activeGroup?.subs || []).includes(m.category);
    const regionMatch = selectedRegion === "all" || m.region === selectedRegion;
    const districtMatch = selectedDistrict === "전체" || m.district === selectedDistrict;

    let dateMatch = true;
    if (selectedDate || quickChip) {
      if (quickChip && ["thisWeek","thisWeekend","nextWeek"].includes(quickChip)) {
        const [start, end] = getChipRange(quickChip);
        // collect all weekdays in that range
        const weekdaysInRange = new Set();
        const cursor = new Date(start);
        while (cursor <= end) {
          weekdaysInRange.add(KO_WEEKDAYS[cursor.getDay()]);
          cursor.setDate(cursor.getDate() + 1);
        }
        dateMatch = [...weekdaysInRange].some(wd => m.day.includes(wd));
      } else if (selectedDate) {
        const ko = KO_WEEKDAYS[selectedDate.getDay()];
        dateMatch = m.day.includes(ko);
      }
    }
    return catMatch && regionMatch && districtMatch && dateMatch;
  });
  const myMeetups = meetups.filter(m => joined.has(m.id));

  const diffColor = { "입문": "blue", "초급": "yellow", "중급": "orange", "상급": "orange" };

  return (
    <>
      <style>{style}</style>

      {/* ===== SPORT PICKER MODAL ===== */}
      {(formSportModalOpen || mpSportModalOpen) && (() => {
        const isMp = mpSportModalOpen;
        const q = sportSearch.toLowerCase().trim();
        const searchResults = q ? ALL_SPORTS.filter(s => s.toLowerCase().includes(q)) : null;
        const isSelected = (s) => isMp ? editProfile.sports.includes(s) : form.category === s;
        const handlePick = (s) => {
          if (isMp) {
            setEditProfile(p => ({ ...p, sports: p.sports.includes(s) ? p.sports.filter(x => x !== s) : [...p.sports, s] }));
          } else {
            setForm(f => ({ ...f, category: s }));
            setFormErrors(err => ({ ...err, category: undefined }));
            setFormSportModalOpen(false);
            setSportSearch("");
          }
        };
        const handleClose = () => {
          isMp ? setMpSportModalOpen(false) : setFormSportModalOpen(false);
          setSportSearch("");
        };
        return (
          <div className="sp-modal-overlay">
            <div className="sp-modal-bg" onClick={handleClose} />
            <div className="sp-modal-sheet">
              <div className="sp-modal-header">
                <div className="sp-modal-handle" />
                <div className="sp-modal-title">{isMp ? "관심 종목 선택" : "종목 선택"}</div>
                <div className="sp-search-wrap">
                  <span className="sp-search-icon">🔍</span>
                  <input className="sp-modal-search" placeholder="종목 검색..." value={sportSearch} autoFocus onChange={e => setSportSearch(e.target.value)} />
                </div>
              </div>
              <div className="sp-modal-body">
                {searchResults ? (
                  searchResults.length === 0
                    ? <div className="sp-empty">검색 결과가 없어요</div>
                    : <div className="sp-subs" style={{paddingTop:4}}>
                        {searchResults.map(s => (
                          <button key={s} className={`sp-sub-btn ${isSelected(s) ? "selected" : ""}`} onClick={() => handlePick(s)}>{s}</button>
                        ))}
                      </div>
                ) : SPORT_TREE.map(g => (
                  <div key={g.id} className="sp-group">
                    <div className="sp-group-label"><span>{g.icon}</span>{g.label}</div>
                    <div className="sp-subs">
                      {g.subs.map(s => (
                        <button key={s} className={`sp-sub-btn ${isSelected(s) ? "selected" : ""}`} onClick={() => handlePick(s)}>{s}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {isMp && (
                <div className="sp-modal-footer">
                  <button className="sp-done-btn" onClick={handleClose}>완료 ({editProfile.sports.length}개 선택됨)</button>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* ===== AUTH SCREENS ===== */}
      {!isLoggedIn && (
        <div className="auth-screen">

          {/* SPLASH */}
          {authScreen === "splash" && (
            <div className="splash">
              <div className="splash-orbs">
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />
              </div>
              <div className="splash-ring">
                <div className="splash-logo-inner">FC</div>
              </div>
              <div className="splash-title">함께 달리면<br /><span>더 멀리</span> 간다</div>
              <div className="splash-sub">지역 운동 소모임을 찾고, 만들고,<br />함께 성장하는 공간</div>
              <div className="splash-features">
                {[
                  { icon: "", bg: "rgba(232,255,71,0.1)", title: "소모임 탐색", desc: "내 주변 운동 크루를 찾아보세요" },
                  { icon: "", bg: "rgba(71,201,255,0.1)", title: "지역 기반 매칭", desc: "가까운 동네에서 같이 운동해요" },
                  { icon: "", bg: "rgba(255,107,53,0.1)", title: "레벨 & 업적 시스템", desc: "꾸준한 운동으로 성장을 기록해요" },
                ].map((f, i) => (
                  <div key={i} className="splash-feature" style={{ animationDelay: `${0.3 + i * 0.1}s` }}>
                    <div className="splash-feature-icon" style={{ background: f.bg }}>{f.icon}</div>
                    <div>
                      <div className="splash-feature-title">{f.title}</div>
                      <div className="splash-feature-text">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="splash-cta">
                <button className="btn-primary" onClick={() => { setSignupStep(1); setAuthScreen("signup"); }}>시작하기 — 무료 가입</button>
                <button className="btn-secondary" onClick={() => setAuthScreen("login")}>이미 계정이 있어요</button>
              </div>
            </div>
          )}

          {/* LOGIN */}
          {authScreen === "login" && (
            <div className="auth-form-wrap">
              <div className="auth-header">
                <button className="auth-back" onClick={() => setAuthScreen("splash")}>←</button>
                <div className="auth-title">로그인</div>
              </div>

              {/* Social Login Buttons */}
              <div className="social-btns">
                {/* Kakao */}
                <button className="social-btn social-btn-kakao" onClick={() => {
                  setAuthLoading(true);
                  setTimeout(() => { setAuthLoading(false); setIsLoggedIn(true); }, 1200);
                }}>
                  <span className="social-btn-icon kakao-icon">
                    <svg viewBox="0 0 24 24" fill="#191919" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
                      <path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.7 1.636 5.082 4.115 6.52L5.2 20.4a.3.3 0 0 0 .437.33l4.05-2.7A12.17 12.17 0 0 0 12 18.6c5.523 0 10-3.477 10-7.8S17.523 3 12 3z"/>
                    </svg>
                  </span>
                  카카오로 계속하기
                </button>

                {/* Google */}
                <button className="social-btn social-btn-google" onClick={() => {
                  setAuthLoading(true);
                  setTimeout(() => { setAuthLoading(false); setIsLoggedIn(true); }, 1200);
                }}>
                  <span className="social-btn-icon google-icon">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </span>
                  Google로 계속하기
                </button>
              </div>

              <div className="auth-divider">또는 이메일로 로그인</div>

              <div className="auth-field">
                <label className="auth-label">이메일</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">✉️</span>
                  <input
                    className={`auth-input ${loginErrors.email ? "error" : loginForm.email.includes("@") ? "valid" : ""}`}
                    placeholder="example@email.com"
                    value={loginForm.email}
                    onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))}
                    onKeyDown={e => e.key === "Enter" && handleLogin()}
                  />
                </div>
                {loginErrors.email && <div className="auth-error">⚠ {loginErrors.email}</div>}
              </div>

              <div className="auth-field">
                <label className="auth-label">비밀번호</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon"></span>
                  <input
                    className={`auth-input ${loginErrors.password ? "error" : ""}`}
                    type={loginForm.showPw ? "text" : "password"}
                    placeholder="비밀번호 입력"
                    value={loginForm.password}
                    onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
                    onKeyDown={e => e.key === "Enter" && handleLogin()}
                  />
                  <button className="pw-toggle" onClick={() => setLoginForm(f => ({ ...f, showPw: !f.showPw }))}>
                    {loginForm.showPw ? "" : ""}
                  </button>
                </div>
                {loginErrors.password && <div className="auth-error">⚠ {loginErrors.password}</div>}
              </div>

              <div className="forgot-link">
                <button onClick={() => { setForgotEmail(""); setForgotError(""); setAuthScreen("forgot"); }}>
                  비밀번호를 잊으셨나요?
                </button>
              </div>

              <button className={`btn-primary ${authLoading ? "btn-loading" : ""}`} onClick={handleLogin} disabled={authLoading}>
                {authLoading ? "로그인 중..." : "이메일로 로그인"}
              </button>

              <div className="auth-footer-link">
                아직 계정이 없으신가요?
                <button onClick={() => { setSignupStep(1); setSignupErrors({}); setAuthScreen("signup"); }}>회원가입</button>
              </div>
            </div>
          )}

          {/* FORGOT PASSWORD */}
          {authScreen === "forgot" && (
            <div className="forgot-screen">
              <div className="auth-header">
                <button className="auth-back" onClick={() => setAuthScreen("login")}>←</button>
                <div className="auth-title">비밀번호 재설정</div>
              </div>

              <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.8, marginBottom: 28 }}>
                가입 시 사용한 <strong style={{ color: "var(--text)" }}>Google 계정 이메일</strong>을 입력하세요.<br />
                비밀번호 재설정 링크를 보내드립니다.
              </div>

              {/* Google Only Notice */}
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                background: "rgba(66,133,244,0.08)", border: "1px solid rgba(66,133,244,0.2)",
                borderRadius: 12, padding: "12px 14px", marginBottom: 22
              }}>
                <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
                  카카오 로그인 사용자는 카카오 계정에서<br />직접 비밀번호를 변경해주세요.
                </span>
              </div>

              <div className="auth-field">
                <label className="auth-label">이메일 주소</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">✉️</span>
                  <input
                    className={`auth-input ${forgotError ? "error" : forgotEmail.includes("@") ? "valid" : ""}`}
                    placeholder="google 계정 이메일"
                    value={forgotEmail}
                    onChange={e => { setForgotEmail(e.target.value); setForgotError(""); }}
                    onKeyDown={e => e.key === "Enter" && handleForgotSubmit()}
                  />
                </div>
                {forgotError && <div className="auth-error">⚠ {forgotError}</div>}
              </div>

              <div style={{ height: 8 }} />

              <button
                className={`btn-primary ${forgotLoading ? "btn-loading" : ""}`}
                onClick={handleForgotSubmit}
                disabled={forgotLoading}
              >
                {forgotLoading ? "전송 중..." : "재설정 링크 보내기"}
              </button>

              <div className="auth-footer-link" style={{ marginTop: 20 }}>
                <button onClick={() => setAuthScreen("login")}>← 로그인으로 돌아가기</button>
              </div>
            </div>
          )}

          {/* FORGOT SENT */}
          {authScreen === "forgot-sent" && (
            <div className="forgot-sent-wrap">
              <div className="forgot-sent-icon"></div>
              <div className="forgot-sent-title">메일을 보냈어요!</div>
              <div className="forgot-sent-sub">아래 이메일로 재설정 링크를 전송했습니다.</div>
              <div className="forgot-sent-email">{forgotEmail}</div>
              <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8, marginBottom: 32 }}>
                메일함을 확인해주세요. 링크는 <strong style={{ color: "var(--text)" }}>30분간</strong> 유효합니다.<br />
                스팸 폴더도 함께 확인해보세요.
              </div>
              <button className="btn-primary" onClick={() => setAuthScreen("login")}>
                로그인으로 돌아가기
              </button>
              <button className="resend-link" onClick={() => {
                setForgotLoading(true);
                setTimeout(() => { setForgotLoading(false); showToast("✅ 재전송 완료"); }, 1000);
              }}>
                이메일을 못 받으셨나요? 재전송
              </button>
            </div>
          )}

          {/* SIGNUP */}
          {authScreen === "signup" && (
            <div className="auth-form-wrap">
              <div className="auth-header">
                <button className="auth-back" onClick={() => signupStep > 1 ? (setSignupStep(s => s - 1), setSignupErrors({})) : setAuthScreen("splash")}>←</button>
                <div className="auth-title">회원가입</div>
              </div>

              {/* Step indicators */}
              <div className="step-indicators">
                {[1,2,3].map(s => (
                  <div key={s} className={`step-dot ${s === signupStep ? "active" : s < signupStep ? "done" : ""}`} />
                ))}
              </div>
              <div className="step-label">
                단계 <strong>{signupStep} / 3</strong> — {["기본 정보", "추가 정보", "관심 운동"][signupStep - 1]}
              </div>

              {/* Step 1 */}
              {signupStep === 1 && (
                <>
                  <div className="auth-field">
                    <label className="auth-label">이름</label>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon"></span>
                      <input className={`auth-input ${signupErrors.name ? "error" : signupForm.name ? "valid" : ""}`}
                        placeholder="홍길동" value={signupForm.name}
                        onChange={e => setSignupForm(f => ({ ...f, name: e.target.value }))} />
                    </div>
                    {signupErrors.name && <div className="auth-error">⚠ {signupErrors.name}</div>}
                  </div>
                  <div className="auth-field">
                    <label className="auth-label">이메일</label>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon">✉️</span>
                      <input className={`auth-input ${signupErrors.email ? "error" : signupForm.email.includes("@") ? "valid" : ""}`}
                        placeholder="example@email.com" value={signupForm.email}
                        onChange={e => setSignupForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                    {signupErrors.email && <div className="auth-error">⚠ {signupErrors.email}</div>}
                  </div>
                  <div className="auth-field">
                    <label className="auth-label">비밀번호</label>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon"></span>
                      <input className={`auth-input ${signupErrors.password ? "error" : signupForm.password.length >= 8 ? "valid" : ""}`}
                        type={signupForm.showPw ? "text" : "password"}
                        placeholder="8자 이상 입력" value={signupForm.password}
                        onChange={e => setSignupForm(f => ({ ...f, password: e.target.value }))} />
                      <button className="pw-toggle" onClick={() => setSignupForm(f => ({ ...f, showPw: !f.showPw }))}>
                        {signupForm.showPw ? "" : ""}
                      </button>
                    </div>
                    {signupErrors.password && <div className="auth-error">⚠ {signupErrors.password}</div>}
                  </div>
                  <div className="auth-field">
                    <label className="auth-label">비밀번호 확인</label>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon"></span>
                      <input className={`auth-input ${signupErrors.confirmPw ? "error" : signupForm.confirmPw && signupForm.password === signupForm.confirmPw ? "valid" : ""}`}
                        type={signupForm.showConfirm ? "text" : "password"}
                        placeholder="비밀번호 재입력" value={signupForm.confirmPw}
                        onChange={e => setSignupForm(f => ({ ...f, confirmPw: e.target.value }))} />
                      <button className="pw-toggle" onClick={() => setSignupForm(f => ({ ...f, showConfirm: !f.showConfirm }))}>
                        {signupForm.showConfirm ? "" : ""}
                      </button>
                    </div>
                    {signupErrors.confirmPw && <div className="auth-error">⚠ {signupErrors.confirmPw}</div>}
                  </div>
                </>
              )}

              {/* Step 2 */}
              {signupStep === 2 && (
                <>
                  <div className="auth-field">
                    <label className="auth-label">전화번호</label>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon"></span>
                      <input className={`auth-input ${signupErrors.phone ? "error" : signupForm.phone ? "valid" : ""}`}
                        placeholder="010-0000-0000" value={signupForm.phone}
                        onChange={e => setSignupForm(f => ({ ...f, phone: e.target.value }))} />
                    </div>
                    {signupErrors.phone && <div className="auth-error">⚠ {signupErrors.phone}</div>}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div className="auth-field">
                      <label className="auth-label">출생연도</label>
                      <div className="auth-input-wrap">
                        <span className="auth-input-icon"></span>
                        <input className={`auth-input ${signupErrors.birthYear ? "error" : signupForm.birthYear ? "valid" : ""}`}
                          placeholder="1995" maxLength={4} value={signupForm.birthYear}
                          onChange={e => setSignupForm(f => ({ ...f, birthYear: e.target.value }))} />
                      </div>
                      {signupErrors.birthYear && <div className="auth-error">⚠ {signupErrors.birthYear}</div>}
                    </div>
                    <div className="auth-field">
                      <label className="auth-label">성별</label>
                      <div style={{ display: "flex", gap: 8, marginTop: 7 }}>
                        {["남성", "여성", "기타"].map(g => (
                          <button key={g}
                            className={`sport-pick-btn ${signupForm.gender === g ? "selected" : ""}`}
                            style={{ flex: 1, padding: "12px 0", fontSize: 12 }}
                            onClick={() => setSignupForm(f => ({ ...f, gender: g }))}
                          >{g}</button>
                        ))}
                      </div>
                      {signupErrors.gender && <div className="auth-error">⚠ {signupErrors.gender}</div>}
                    </div>
                  </div>
                  <div className="auth-field">
                    <label className="auth-label">활동 지역</label>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon"></span>
                      <select className="auth-input" style={{ paddingLeft: 44 }}
                        value={signupForm.region}
                        onChange={e => setSignupForm(f => ({ ...f, region: e.target.value }))}>
                        {REGIONS.filter(r => r.id !== "all").map(r => (
                          <option key={r.id} value={r.id}>{r.emoji} {r.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="auth-field">
                    <div className="terms-row" onClick={() => setSignupForm(f => ({ ...f, terms: !f.terms }))}>
                      <div className={`terms-check ${signupForm.terms ? "checked" : ""}`} />
                      <div className="terms-text">[필수] <a href="#">이용약관</a> 및 <a href="#">개인정보 처리방침</a>에 동의합니다</div>
                    </div>
                    <div className="terms-row" onClick={() => setSignupForm(f => ({ ...f, privacy: !f.privacy }))}>
                      <div className={`terms-check ${signupForm.privacy ? "checked" : ""}`} />
                      <div className="terms-text">[선택] 마케팅 정보 수신에 동의합니다</div>
                    </div>
                    {signupErrors.terms && <div className="auth-error">⚠ {signupErrors.terms}</div>}
                  </div>
                </>
              )}

              {/* Step 3 */}
              {signupStep === 3 && (
                <>
                  <div style={{ fontSize: 14, color: "var(--muted)", marginBottom: 16, lineHeight: 1.6 }}>
                    관심 운동을 선택하면 맞춤 소모임을 추천해드려요! 여러 개 선택 가능해요 
                  </div>
                  <div className="sport-picker" style={{ marginBottom: 8 }}>
                    {["러닝", "사이클", "수영", "요가", "헬스", "구기종목", "격투기", "클라이밍", "배드민턴", "테니스", "골프", "등산"].map(s => (
                      <button key={s}
                        className={`sport-pick-btn ${signupForm.sports.includes(s) ? "selected" : ""}`}
                        onClick={() => setSignupForm(f => ({
                          ...f, sports: f.sports.includes(s) ? f.sports.filter(x => x !== s) : [...f.sports, s]
                        }))}>
                        {s}
                      </button>
                    ))}
                  </div>
                  {signupErrors.sports && <div className="auth-error">⚠ {signupErrors.sports}</div>}
                  {signupForm.sports.length > 0 && (
                    <div style={{ fontSize: 12, color: "var(--accent)", marginTop: 8 }}>
                      ✓ {signupForm.sports.length}개 선택됨: {signupForm.sports.join(", ")}
                    </div>
                  )}
                </>
              )}

              <div style={{ marginTop: 28 }}>
                <button className={`btn-primary ${authLoading ? "btn-loading" : ""}`} onClick={handleSignupNext} disabled={authLoading}>
                  {authLoading ? "처리 중..." : signupStep === 3 ? "가입 완료 " : "다음으로 →"}
                </button>
              </div>

              <div className="auth-footer-link">
                이미 계정이 있으신가요?
                <button onClick={() => { setAuthScreen("login"); setSignupErrors({}); }}>로그인</button>
              </div>
            </div>
          )}

          {/* SUCCESS */}
          {authScreen === "success" && (
            <div className="auth-success">
              <div className="success-ring"></div>
              <div className="success-title">가입 완료!</div>
              <div className="success-sub">
                {signupForm.name || "회원"}님, 환영해요!<br />
                이제 전국의 운동 크루와 함께해요.
              </div>
              <button className="btn-primary" onClick={() => setIsLoggedIn(true)}>
                FITCREW 시작하기 →
              </button>
            </div>
          )}

        </div>
      )}

      {/* ===== MAIN APP ===== */}
      {isLoggedIn && (
      <div className="app">
        {toast && <div className="toast">{toast}</div>}

        {/* Header */}
        <div className="header">
          <div className="header-top">
            <div className="logo">FIT<span>CREW</span></div>
            <button className="avatar-btn" onClick={() => { setMypageOpen(true); setEditing(false); }}>
              {avatarImg
                ? <img src={avatarImg} style={{width:38,height:38,borderRadius:"50%",objectFit:"cover",display:"block"}} alt="프로필" />
                : <div className="avatar">{profile.name.charAt(0)}</div>
              }
              <div className="notif-dot" />
            </button>
          </div>
          <div className="greeting">안녕하세요, {profile.name}님! 👋</div>
          <div className="greeting"><strong>오늘도 함께 운동해요 </strong></div>
        </div>

        {/* Region Selector Bar */}
        {tab === "explore" && (() => {
          const activeRegion = REGIONS.find(r => r.id === selectedRegion);
          const displayLabel = selectedRegion === "all"
            ? "지역 전체"
            : `${activeRegion?.label}${selectedDistrict !== "전체" ? ` · ${selectedDistrict}` : ""}`;
          const dateLabel = quickChip
            ? QUICK_CHIPS.find(c => c.key === quickChip)?.label
            : selectedDate ? formatDateLabel(selectedDate) : "날짜 선택";
          return (
            <div className="region-bar">
              {/* Region trigger */}
              <button className={`region-trigger ${regionOpen ? "open" : ""}`} onClick={() => setRegionOpen(true)}>
                <div className="region-trigger-left">
                  <div className="region-pin"></div>
                  <div style={{ textAlign: "left" }}>
                    <div className="region-trigger-text">{displayLabel}</div>
                    <div className="region-trigger-sub">지역으로 찾기</div>
                  </div>
                </div>
                <span className={`region-chevron ${regionOpen ? "open" : ""}`}>▼</span>
              </button>

              {/* Date trigger */}
              <button
                className={`date-trigger ${dateOpen ? "open" : ""} ${selectedDate ? "active" : ""}`}
                onClick={() => setDateOpen(true)}
              >
                {selectedDate && <div className="date-active-dot" />}
                <div className="date-pin"></div>
                <div style={{ textAlign: "left", flex: 1, minWidth: 0 }}>
                  <div className="date-trigger-text">{dateLabel}</div>
                  <div className="date-trigger-sub">날짜로 찾기</div>
                </div>
                <span className={`date-trigger-chevron ${dateOpen ? "open" : ""}`}>▼</span>
              </button>
            </div>
          );
        })()}

        {/* Category Nav (explore only) */}
        {tab === "explore" && (
          <>
            <div className="nav">
              <button className={`nav-btn ${!catGroup ? "active" : ""}`} onClick={() => { setCatGroup(null); setCatSub(null); }}>전체</button>
              {SPORT_TREE.map(g => (
                <button key={g.id} className={`nav-btn ${catGroup === g.id ? "active" : ""}`}
                  onClick={() => { setCatGroup(catGroup === g.id ? null : g.id); setCatSub(null); }}>
                  {g.icon} {g.label}
                </button>
              ))}
            </div>
            {catGroup && (
              <div className="nav sub-nav">
                <button className={`nav-btn sub ${!catSub ? "active" : ""}`} onClick={() => setCatSub(null)}>전체</button>
                {(SPORT_TREE.find(g => g.id === catGroup)?.subs || []).map(s => (
                  <button key={s} className={`nav-btn sub ${catSub === s ? "active" : ""}`} onClick={() => setCatSub(catSub === s ? null : s)}>{s}</button>
                ))}
              </div>
            )}
          </>
        )}

        {/* Content */}
        <div className="content">
          {tab === "explore" && (
            <>
              <div className="section-title">
                소모임 둘러보기
                {selectedRegion !== "all" && (
                  <span className="region-badge">
                    {REGIONS.find(r => r.id === selectedRegion)?.emoji} {REGIONS.find(r => r.id === selectedRegion)?.label}{selectedDistrict !== "전체" ? ` · ${selectedDistrict}` : ""}
                  </span>
                )}
                {selectedDate && (
                  <span className="date-badge">
                     {quickChip ? QUICK_CHIPS.find(c=>c.key===quickChip)?.label : formatDateLabel(selectedDate)}
                  </span>
                )}
              </div>
              {filtered.length === 0 ? (
                <div className="empty-state">
                  <div className="big-emoji"></div>
                  <p>해당 지역에 소모임이 없어요.<br />다른 지역을 탐색하거나 새 소모임을 만들어보세요!</p>
                </div>
              ) : filtered.map((m, i) => (
                <div key={m.id} className="card" style={{ animationDelay: `${i * 60}ms` }} onClick={() => setSelected(m)}>
                  <div className="card-header">
                    <div className="card-icon" style={{ background: `${m.color}18` }}>{m.emoji}</div>
                    <div className="card-info">
                      <div className="card-title">{m.title}</div>
                      <div className="card-sub"> {m.location} ·  {m.day} {m.time}</div>
                      <div className="tags">
                        <span className={`tag ${diffColor[m.difficulty] || "yellow"}`}>{m.difficulty}</span>
                        <span className="tag">{m.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="member-count">
                      <div className="member-avatars">
                        {m.members.slice(0, 4).map((mem, idx) => (
                          <div key={idx} className="member-avatar" style={{ background: COLORS[idx % COLORS.length], color: "#000" }}>{mem}</div>
                        ))}
                      </div>
                      <span>{m.members.length}/{m.maxMembers}명</span>
                    </div>
                    <button className={`join-btn ${joined.has(m.id) ? "joined" : "not-joined"}`} onClick={(e) => toggleJoin(m.id, e)}>
                      {joined.has(m.id) ? "✓ 참석중" : "참석하기"}
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}

          {tab === "chat" && (
            <>
              <div className="section-title">채팅</div>
              {myMeetups.length === 0 ? (
                <div className="empty-state">
                  <div className="big-emoji">💬</div>
                  <p>참석한 소모임이 없어요.<br/>소모임에 참석하면 채팅을 이용할 수 있어요!</p>
                </div>
              ) : (
                <div className="chat-room-list">
                  {myMeetups.map(m => {
                    const log = chatLogs[m.id];
                    const lastMsg = log?.messages?.[log.messages.length - 1];
                    const unread = log?.unread || 0;
                    return (
                      <div key={m.id} className="chat-room-item" onClick={() => {
                        setChatRoom(m);
                        setChatLogs(prev => ({ ...prev, [m.id]: { ...(prev[m.id]||{}), unread: 0, messages: prev[m.id]?.messages || [] } }));
                        setTimeout(() => chatBottomRef.current?.scrollIntoView({ behavior:"smooth" }), 80);
                      }}>
                        <div className="chat-room-icon" style={{background:`${m.color}20`}}>{m.emoji}</div>
                        <div className="chat-room-info">
                          <div className="chat-room-name">{m.title}</div>
                          <div className="chat-room-last">
                            {lastMsg ? `${lastMsg.mine ? "나" : lastMsg.sender}: ${lastMsg.text}` : "아직 대화가 없어요"}
                          </div>
                        </div>
                        <div className="chat-room-meta">
                          {lastMsg && <div className="chat-room-time">{lastMsg.time}</div>}
                          {unread > 0 && <div className="chat-unread">{unread}</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {tab === "my" && (
            <>
              <div className="section-title">내 소모임</div>
              {myMeetups.length === 0 ? (
                <div className="empty-state">
                  <div className="big-emoji"></div>
                  <p>아직 참석한 소모임이 없어요.<br />새로운 소모임을 찾아보세요!</p>
                </div>
              ) : myMeetups.map((m, i) => (
                <div key={m.id} className="my-card" style={{ animationDelay: `${i * 60}ms` }} onClick={() => setSelected(m)}>
                  <div className="my-card-icon" style={{ background: `${m.color}18` }}>{m.emoji}</div>
                  <div className="my-card-info">
                    <div className="my-card-title">{m.title}</div>
                    <div className="my-card-meta"> {m.location}</div>
                    <div className="my-card-meta"> {m.day} · ⏰ {m.time}</div>
                  </div>
                  <div className="next-badge">{m.members.length}명</div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* ===== CHAT ROOM SCREEN ===== */}
        {chatRoom && (
          <div className="chat-screen">
            {/* Header */}
            <div className="chat-header">
              <button className="chat-back" onClick={() => setChatRoom(null)}>←</button>
              <div className="chat-header-icon" style={{background:`${chatRoom.color}20`}}>{chatRoom.emoji}</div>
              <div className="chat-header-info">
                <div className="chat-header-name">{chatRoom.title}</div>
                <div className="chat-header-members">멤버 {chatRoom.members.length}명</div>
              </div>
            </div>

            {/* Messages */}
            <div className="chat-messages">
              {(() => {
                const msgs = chatLogs[chatRoom.id]?.messages || [];
                if (msgs.length === 0) return (
                  <div className="chat-empty">
                    <div className="chat-empty-icon">💬</div>
                    <div>아직 대화가 없어요.<br/>첫 메시지를 남겨보세요!</div>
                  </div>
                );
                let lastDate = null;
                return msgs.map((msg, idx) => {
                  const showDate = msg.date !== lastDate;
                  lastDate = msg.date;
                  const prevMsg = msgs[idx - 1];
                  const showSender = !msg.mine && (!prevMsg || prevMsg.sender !== msg.sender || showDate);
                  return (
                    <div key={msg.id}>
                      {showDate && (
                        <div className="chat-day-divider"><span>{msg.date}</span></div>
                      )}
                      <div className={`chat-msg-row ${msg.mine ? "mine" : ""}`}>
                        {!msg.mine && (
                          <div className="chat-avatar" style={{visibility: showSender ? "visible" : "hidden"}}>{msg.avatar}</div>
                        )}
                        <div className="chat-bubble-wrap">
                          {showSender && <div className="chat-sender">{msg.sender}</div>}
                          <div style={{display:"flex",alignItems:"flex-end",gap:4,flexDirection:msg.mine?"row-reverse":"row"}}>
                            <div className={`chat-bubble ${msg.mine ? "mine" : "them"}`}>{msg.text}</div>
                            <div className="chat-msg-time">{msg.time}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
              <div ref={chatBottomRef} />
            </div>

            {/* Input */}
            <div className="chat-input-bar">
              <textarea
                ref={chatInputRef}
                className="chat-input"
                placeholder="메시지를 입력하세요..."
                value={chatInput}
                rows={1}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              />
              <button className="chat-send-btn" disabled={!chatInput.trim()} onClick={sendMessage}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" width="16" height="16">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Bottom Nav */}
        <div className="bottom-nav">
          <button className={`bottom-btn ${tab === "explore" ? "active" : ""}`} onClick={() => setTab("explore")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            탐색
          </button>
          <button className="fab" onClick={() => setCreating(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          <button className={`bottom-btn ${tab === "chat" ? "active" : ""}`} onClick={() => setTab("chat")} style={{position:"relative"}}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            채팅
            {Object.values(chatLogs).reduce((s,r) => s + (r.unread||0), 0) > 0 && (
              <span style={{position:"absolute",top:6,right:10,background:"var(--accent2)",color:"#fff",fontSize:9,fontWeight:800,borderRadius:100,padding:"1px 5px"}}>
                {Object.values(chatLogs).reduce((s,r) => s + (r.unread||0), 0)}
              </span>
            )}
          </button>
          <button className={`bottom-btn ${tab === "my" ? "active" : ""}`} onClick={() => setTab("my")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            내 소모임
          </button>
        </div>

        {/* Detail Sheet */}
        {selected && (
          <div className="detail-overlay" onClick={() => setSelected(null)}>
            <div className="detail-sheet" onClick={e => e.stopPropagation()} style={{ position: "relative" }}>
              <div className="detail-handle" />
              <button className="close-btn" onClick={() => setSelected(null)}>×</button>
              <div className="detail-icon-big" style={{ background: `${selected.color}18` }}>{selected.emoji}</div>
              <div className="tags" style={{ marginBottom: 8 }}>
                <span className={`tag ${diffColor[selected.difficulty] || "yellow"}`}>{selected.difficulty}</span>
                <span className="tag">{selected.category}</span>
              </div>
              <div className="detail-title">{selected.title}</div>
              <div className="detail-desc">{selected.desc}</div>
              <div className="detail-grid">
                <div className="detail-stat">
                  <div className="detail-stat-label"> 장소</div>
                  <div className="detail-stat-value" style={{ fontSize: 13 }}>{selected.location}</div>
                </div>
                <div className="detail-stat">
                  <div className="detail-stat-label">⏰ 시간</div>
                  <div className="detail-stat-value">{selected.time}</div>
                </div>
                <div className="detail-stat">
                  <div className="detail-stat-label"> 요일</div>
                  <div className="detail-stat-value">{selected.day}</div>
                </div>
                <div className="detail-stat">
                  <div className="detail-stat-label"> 멤버</div>
                  <div className="detail-stat-value">{selected.members.length} / {selected.maxMembers}명</div>
                </div>
              </div>
              <div style={{ marginTop: 8 }}>
                <div className="form-label">참석자</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }}>
                  {selected.members.map((mem, idx) => (
                    <div key={idx} className="member-avatar" style={{ background: COLORS[idx % COLORS.length], color: "#000", width: 36, height: 36, fontSize: 14, border: "none" }}>{mem}</div>
                  ))}
                </div>
              </div>
              <button className={`detail-join-btn ${joined.has(selected.id) ? "joined" : "not-joined"}`} onClick={() => { toggleJoin(selected.id); }}>
                {joined.has(selected.id) ? "✓ 참석 중 (취소하기)" : "참석하기"}
              </button>
            </div>
          </div>
        )}

        {/* Region Panel */}
        {regionOpen && (() => {
          const activeRegion = REGIONS.find(r => r.id === selectedRegion);
          const districts = activeRegion?.districts || [];
          return (
            <div className="region-panel">
              <div className="region-panel-backdrop" onClick={() => setRegionOpen(false)} />
              <div className="region-sheet">
                <div className="region-sheet-handle" />
                <div className="region-sheet-title"> 지역 선택</div>

                <div className="region-grid">
                  {REGIONS.map(r => (
                    <div
                      key={r.id}
                      className={`region-item ${selectedRegion === r.id ? "selected" : ""}`}
                      onClick={() => {
                        setSelectedRegion(r.id);
                        setSelectedDistrict("전체");
                      }}
                    >
                      <div className="region-item-emoji">{r.emoji}</div>
                      <div className="region-item-label">{r.label}</div>
                    </div>
                  ))}
                </div>

                {districts.length > 0 && (
                  <div className="district-section">
                    <div className="district-title">세부 지역</div>
                    <div className="district-pills">
                      <button
                        className={`district-pill ${selectedDistrict === "전체" ? "selected" : ""}`}
                        onClick={() => setSelectedDistrict("전체")}
                      >전체</button>
                      {districts.map(d => (
                        <button
                          key={d}
                          className={`district-pill ${selectedDistrict === d ? "selected" : ""}`}
                          onClick={() => setSelectedDistrict(d)}
                        >{d}</button>
                      ))}
                    </div>
                  </div>
                )}

                <button className="region-confirm-btn" onClick={() => {
                  setRegionOpen(false);
                  const r = REGIONS.find(r => r.id === selectedRegion);
                  const label = selectedRegion === "all" ? "전체 지역" : `${r?.label}${selectedDistrict !== "전체" ? ` · ${selectedDistrict}` : ""}`;
                  showToast(` ${label}으로 변경되었어요`);
                }}>
                  선택 완료
                </button>
              </div>
            </div>
          );
        })()}

        {/* Date Panel */}
        {dateOpen && (() => {
          const cells = getDaysInMonth(calViewYear, calViewMonth);
          return (
            <div className="date-panel">
              <div className="date-panel-backdrop" onClick={() => setDateOpen(false)} />
              <div className="date-sheet">
                <div className="date-sheet-handle" />
                <div className="date-sheet-title"> 날짜로 탐색</div>
                <div className="date-sheet-sub">최대 6개월 이내 날짜를 선택하세요</div>

                {/* Quick chips */}
                <div className="date-quick-chips">
                  {QUICK_CHIPS.map(c => (
                    <button
                      key={c.key}
                      className={`date-chip ${quickChip === c.key ? "selected" : ""}`}
                      onClick={() => handleQuickChip(c.key)}
                    >{c.label}</button>
                  ))}
                </div>

                {/* Calendar */}
                <div className="cal-header">
                  <div className="cal-month-label">{calViewYear}년 {KO_MONTHS[calViewMonth]}</div>
                  <div className="cal-nav">
                    <button
                      className="cal-nav-btn"
                      disabled={!canPrevMonth()}
                      onClick={() => {
                        if (calViewMonth === 0) { setCalViewMonth(11); setCalViewYear(y => y-1); }
                        else setCalViewMonth(m => m-1);
                      }}
                    >‹</button>
                    <button
                      className="cal-nav-btn"
                      disabled={!canNextMonth()}
                      onClick={() => {
                        if (calViewMonth === 11) { setCalViewMonth(0); setCalViewYear(y => y+1); }
                        else setCalViewMonth(m => m+1);
                      }}
                    >›</button>
                  </div>
                </div>

                <div className="cal-weekdays">
                  {KO_WEEKDAYS.map(w => <div key={w} className="cal-weekday">{w}</div>)}
                </div>

                <div className="cal-grid">
                  {cells.map((day, i) => {
                    if (!day) return <div key={`empty-${i}`} className="cal-day empty" />;
                    const thisDate = new Date(calViewYear, calViewMonth, day);
                    thisDate.setHours(0,0,0,0);
                    const isPast = thisDate < today;
                    const isFuture = thisDate > maxDate;
                    const isDisabled = isPast || isFuture;
                    const isToday = thisDate.getTime() === today.getTime();
                    const isSelected = selectedDate && !quickChip && thisDate.getTime() === selectedDate.getTime();
                    const inRange   = isInChipRange(thisDate);
                    const rangeStart = isChipRangeStart(thisDate);
                    const rangeEnd   = isChipRangeEnd(thisDate);
                    return (
                      <button
                        key={day}
                        className={[
                          "cal-day",
                          isDisabled ? "disabled" : "",
                          isToday ? "today" : "",
                          isSelected ? "selected" : "",
                          inRange && !rangeStart && !rangeEnd ? "in-range" : "",
                          rangeStart ? "selected range-start" : "",
                          rangeEnd ? "selected range-end" : "",
                        ].join(" ").trim()}
                        onClick={() => !isDisabled && handleCalDay(day)}
                      >{day}</button>
                    );
                  })}
                </div>

                <button className="date-confirm-btn" onClick={applyDateFilter}>
                  {selectedDate
                    ? `${quickChip ? QUICK_CHIPS.find(c=>c.key===quickChip)?.label : formatDateLabel(selectedDate)} 적용`
                    : "날짜 선택 후 적용"}
                </button>
                {selectedDate && (
                  <button className="date-reset-btn" onClick={resetDateFilter}>필터 초기화</button>
                )}
              </div>
            </div>
          );
        })()}

        {/* Create Form */}
        {creating && (
          <div className="form-overlay">
            <div className="form-sheet">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div className="form-title">새 소모임 만들기</div>
                <button className="close-btn" style={{ position: "static" }} onClick={() => { setCreating(false); setFormStep(1); setFormErrors({}); }}>×</button>
              </div>

              <div className="form-group">
                <div className="form-label">이모지</div>
                <div className="emoji-grid">
                  {EMOJIS.map(e => (
                    <div key={e} className={`emoji-option ${form.emoji === e ? "selected" : ""}`} onClick={() => setForm(f => ({ ...f, emoji: e }))}>{e}</div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <div className="form-label">컬러</div>
                <div className="color-grid">
                  {COLORS.map(c => (
                    <div key={c} className={`color-option ${form.color === c ? "selected" : ""}`} style={{ background: c }} onClick={() => setForm(f => ({ ...f, color: c }))} />
                  ))}
                </div>
              </div>

              <div className={`form-group ${formErrors.title ? "has-error" : ""}`}>
                <div className="form-label">소모임 이름 <span style={{color:"var(--accent2)"}}>*</span></div>
                <input
                  className={`form-input ${formErrors.title ? "has-error" : ""}`}
                  placeholder="예: 한강 야간 러닝"
                  value={form.title}
                  onChange={e => {
                    setFormErrors(err => ({...err, title: undefined}));
                    setForm(f => ({ ...f, title: e.target.value }));
                  }}
                />
                {formErrors.title && <div className="form-field-error">⚠ {formErrors.title}</div>}
              </div>

              <div className={`form-group ${formErrors.category ? "has-error" : ""}`}>
                <div className="form-label">종목 <span style={{color:"var(--accent2)"}}>*</span></div>
                <button
                  className={`form-input sport-pick-btn ${form.category ? "chosen" : ""} ${formErrors.category ? "has-error" : ""}`}
                  onClick={() => setFormSportModalOpen(true)}
                  style={{ textAlign:"left", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer" }}
                >
                  <span>
                    {form.category
                      ? <><span style={{color:"var(--muted)",fontSize:12,marginRight:6}}>{SPORT_TREE.find(g=>g.subs.includes(form.category))?.icon} {SPORT_TREE.find(g=>g.subs.includes(form.category))?.label}</span>{form.category}</>
                      : <span style={{color:"var(--muted)"}}>종목을 선택해주세요</span>}
                  </span>
                  <span style={{color:"var(--muted)"}}>›</span>
                </button>
                {formErrors.category && <div className="form-field-error">⚠ {formErrors.category}</div>}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div className="form-group">
                  <div className="form-label">지역</div>
                  <select className="form-select" value={form.region} onChange={e => setForm(f => ({ ...f, region: e.target.value, district: "전체" }))}>
                    {REGIONS.filter(r => r.id !== "all").map(r => <option key={r.id} value={r.id}>{r.emoji} {r.label}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <div className="form-label">세부 지역</div>
                  <select className="form-select" value={form.district} onChange={e => setForm(f => ({ ...f, district: e.target.value }))}>
                    <option value="전체">전체</option>
                    {(REGIONS.find(r => r.id === form.region)?.districts || []).map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <div className="form-label">난이도</div>
                <select className="form-select" value={form.difficulty} onChange={e => setForm(f => ({ ...f, difficulty: e.target.value }))}>
                  {["입문", "초급", "중급", "상급"].map(d => <option key={d}>{d}</option>)}
                </select>
              </div>

              <div className="form-group">
                <div className="form-label">소개</div>
                <textarea className="form-textarea" placeholder="소모임을 소개해 주세요..." value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} />
              </div>

              <div className={`form-group ${formErrors.days ? "has-error" : ""}`}>
                <div className="form-label">활동 요일 (복수 선택) <span style={{color:"var(--accent2)"}}>*</span></div>
                <div className="day-picker">
                  {["일","월","화","수","목","금","토"].map((d, i) => (
                    <button
                      key={d}
                      className={[
                        "day-btn",
                        i === 0 ? "sun" : i === 6 ? "sat" : "",
                        form.days.includes(d) ? "selected" : "",
                      ].join(" ").trim()}
                      onClick={() => {
                        setFormErrors(e => ({...e, days: undefined}));
                        setForm(f => ({
                          ...f,
                          days: f.days.includes(d)
                            ? f.days.filter(x => x !== d)
                            : [...f.days, d]
                        }));
                      }}
                    >{d}</button>
                  ))}
                </div>
                {form.days.length > 0
                  ? <div style={{ fontSize: 11, color: "var(--accent)", marginTop: 6 }}>✓ {form.days.join(", ")} 요일 선택됨</div>
                  : formErrors.days && <div className="form-field-error">⚠ {formErrors.days}</div>
                }
              </div>

              <div className="form-group">
                <div className="form-label">활동 시간 <span style={{color:"var(--accent2)"}}>*</span></div>
                {(() => {
                  const hours = Array.from({length:12},(_,i)=>String(i+1));
                  const mins = ["00","30"];
                  return (
                    <div style={{ display:"grid", gridTemplateColumns:"1.4fr 1fr 1fr", gap:8 }}>
                      <div>
                        <div className="time-picker-label">오전 / 오후</div>
                        <select className="time-picker-select"
                          value={form.timeAmPm}
                          onChange={e => setForm(f=>({...f, timeAmPm: e.target.value}))}>
                          <option value="오전">오전</option>
                          <option value="오후">오후</option>
                        </select>
                      </div>
                      <div>
                        <div className="time-picker-label">시</div>
                        <select className="time-picker-select"
                          value={form.timeHour}
                          onChange={e => setForm(f=>({...f, timeHour: e.target.value}))}>
                          {hours.map(h=><option key={h} value={h}>{h}시</option>)}
                        </select>
                      </div>
                      <div>
                        <div className="time-picker-label">분</div>
                        <select className="time-picker-select"
                          value={form.timeMin}
                          onChange={e => setForm(f=>({...f, timeMin: e.target.value}))}>
                          {mins.map(m=><option key={m} value={m}>{m}분</option>)}
                        </select>
                      </div>
                    </div>
                  );
                })()}
                <div style={{fontSize:11, color:"var(--muted)", marginTop:6}}>
                  선택된 시간: <span style={{color:"var(--accent)", fontWeight:600}}>
                    {form.timeAmPm} {form.timeHour}:{form.timeMin}
                  </span>
                </div>
              </div>

              <div className="form-group">
                <div className="form-label">장소 <span style={{color:"var(--accent2)"}}>*</span></div>

                {/* Search input */}
                {!locationSelected ? (
                  <div className="location-search-wrap">
                    <div style={{position:"relative"}}>
                      <input
                        className={`location-search-input ${formErrors.location ? "has-error" : ""}`}
                        placeholder="장소 검색 (예: 한강공원, 체육관…)"
                        value={locationQuery}
                        autoComplete="off"
                        onFocus={() => { setLocationFocused(true); searchPlaces(locationQuery); }}
                        onBlur={() => setTimeout(() => setLocationFocused(false), 150)}
                        onChange={e => { setLocationQuery(e.target.value); searchPlaces(e.target.value); }}
                        onKeyDown={e => {
                          if (e.key === "ArrowDown") { e.preventDefault(); setLocationKbIndex(i => Math.min(i+1, locationSuggestions.length-1)); }
                          if (e.key === "ArrowUp")   { e.preventDefault(); setLocationKbIndex(i => Math.max(i-1, -1)); }
                          if (e.key === "Enter" && locationKbIndex >= 0) selectPlace(locationSuggestions[locationKbIndex]);
                          if (e.key === "Escape") setLocationSuggestions([]);
                        }}
                      />
                      <span className="location-search-icon"></span>
                    </div>

                    {/* Suggestions dropdown */}
                    {locationFocused && locationQuery.trim() && (
                      <div className="location-suggestions">
                        {locationSuggestions.length > 0
                          ? locationSuggestions.map((place, idx) => {
                              const q = locationQuery.toLowerCase();
                              const nameParts = place.name.split(new RegExp(`(${locationQuery})`, "gi"));
                              return (
                                <div
                                  key={idx}
                                  className={`location-suggestion-item ${locationKbIndex === idx ? "keyboard-active" : ""}`}
                                  onMouseDown={() => selectPlace(place)}
                                >
                                  <div className="location-suggestion-icon">{place.icon}</div>
                                  <div style={{flex:1, minWidth:0}}>
                                    <div className="location-suggestion-name">
                                      {nameParts.map((part, i) =>
                                        part.toLowerCase() === q
                                          ? <mark key={i}>{part}</mark>
                                          : part
                                      )}
                                    </div>
                                    <div className="location-suggestion-addr">{place.address}</div>
                                    <div className="location-suggestion-category">{place.category}</div>
                                  </div>
                                </div>
                              );
                            })
                          : <div className="location-no-results"> 검색 결과가 없어요</div>
                        }
                      </div>
                    )}
                  </div>
                ) : (
                  /* Selected location map card */
                  <div className="location-map-card">
                    {/* Map visual */}
                    <div className="location-map-visual">
                      <div className="location-map-grid" />
                      {/* Decorative roads SVG */}
                      <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.15}} viewBox="0 0 340 130">
                        <line x1="0" y1="65" x2="340" y2="65" stroke="#e8ff47" strokeWidth="6" strokeDasharray="20,8"/>
                        <line x1="170" y1="0" x2="170" y2="130" stroke="#e8ff47" strokeWidth="4" strokeDasharray="12,6"/>
                        <line x1="0" y1="30" x2="110" y2="65" stroke="#47c9ff" strokeWidth="3"/>
                        <line x1="230" y1="65" x2="340" y2="40" stroke="#47c9ff" strokeWidth="3"/>
                        <rect x="60" y="40" width="50" height="30" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>
                        <rect x="220" y="75" width="60" height="25" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>
                        <rect x="250" y="20" width="40" height="35" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>
                      </svg>
                      <div className="location-map-pulse" />
                      <div className="location-map-pin">
                        <div className="location-map-pin-dot" />
                        <div className="location-map-pin-shadow" />
                      </div>
                      <div className="location-map-badge">
                        <span style={{fontSize:8}}></span> 지도 미리보기
                      </div>
                    </div>

                    {/* Place info row */}
                    <div className="location-map-info">
                      <div>
                        <div className="location-map-name">{locationSelected.icon} {locationSelected.name}</div>
                        <div className="location-map-addr">{locationSelected.address}</div>
                        <div style={{fontSize:10, color:"var(--accent3)", marginTop:3, fontWeight:600}}>{locationSelected.category}</div>
                      </div>
                      <button className="location-map-change" onClick={() => {
                        setLocationSelected(null);
                        setLocationQuery("");
                        setLocationSuggestions([]);
                        setForm(f => ({...f, location:"", locationAddress:""}));
                      }}>변경</button>
                    </div>

                    {/* Detail input */}
                    <div style={{padding:"0 14px 14px"}}>
                      <span className="location-detail-label"> 상세 장소 (선택)</span>
                      <input
                        className="location-detail-input"
                        placeholder="예: 3번 출구 앞 광장, 주차장 입구 쪽..."
                        value={locationDetail}
                        onChange={e => {
                          setLocationDetail(e.target.value);
                          setForm(f => ({...f, locationDetail: e.target.value}));
                        }}
                      />
                    </div>
                  </div>
                )}

                {formErrors.location && <div className="form-field-error" style={{marginTop:6}}>⚠ {formErrors.location}</div>}
              </div>

              <div className={`form-group ${(formErrors.startDate || formErrors.endDate) ? "has-error" : ""}`}>
                <div className="form-label">모임 운영 기간 <span style={{color:"var(--accent2)"}}>*</span></div>

                {/* 시작일 — 항상 노출 */}
                {(() => {
                  const sy = form.startYear, sm = form.startMonth, sd = form.startDay;
                  const filled = sy && sm && sd;
                  return (
                    <div style={{marginBottom:12}}>
                      <div className="date-range-label" style={{marginBottom:5}}> 시작일</div>
                      <button
                        style={{
                          width:"100%", padding:"12px 14px", borderRadius:11, textAlign:"left",
                          background: filled ? "rgba(163,71,255,0.1)" : "var(--card2)",
                          border: `1.5px solid ${formErrors.startDate ? "var(--accent2)" : filled ? "#a347ff" : "var(--border)"}`,
                          color: filled ? "#a347ff" : "var(--muted)",
                          fontFamily:"'Pretendard',sans-serif", fontSize:13,
                          fontWeight: filled ? 700 : 500, cursor:"pointer", transition:"all 0.2s",
                          display:"flex", alignItems:"center", gap:8,
                        }}
                        onClick={() => {
                          const base = sy && sm ? new Date(parseInt(sy), parseInt(sm)-1, 1) : new Date(todayForForm);
                          setFormCalViewYear(base.getFullYear());
                          setFormCalViewMonth(base.getMonth());
                          setFormCalOpen("start");
                        }}
                      >
                        <span></span>
                        {filled ? `${sy}년 ${sm}월 ${sd}일` : "시작일을 선택해주세요"}
                      </button>
                      {formErrors.startDate && <div className="form-field-error">⚠ {formErrors.startDate}</div>}
                    </div>
                  );
                })()}

                {/* 기간 선택 버튼 */}
                <div className="duration-options">
                  {[
                    { value: "1개월",  sub: "~4주",    months: 1 },
                    { value: "3개월",  sub: "~12주",   months: 3 },
                    { value: "6개월",  sub: "~24주",   months: 6 },
                    { value: "1년",    sub: "정기 모임", months: 12 },
                    { value: "상시",   sub: "기간 없음", months: null },
                    { value: "직접입력", sub: "날짜 지정", months: "custom" },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      className={`duration-btn ${form.duration === opt.value ? "selected" : ""}`}
                      onClick={() => {
                        setFormErrors(e => ({...e, endDate: undefined}));
                        if (opt.months === "custom") {
                          // open end calendar
                          setForm(f => ({...f, duration: opt.value, endYear:"", endMonth:"", endDay:""}));
                          const base = form.startYear && form.startMonth
                            ? new Date(parseInt(form.startYear), parseInt(form.startMonth)-1, 1)
                            : new Date(todayForForm);
                          setFormCalViewYear(base.getFullYear());
                          setFormCalViewMonth(base.getMonth());
                          setFormCalOpen("end");
                        } else if (opt.months !== null && form.startYear && form.startMonth && form.startDay) {
                          // auto-calc end date
                          const end = new Date(
                            parseInt(form.startYear), parseInt(form.startMonth)-1+opt.months, parseInt(form.startDay)
                          );
                          // cap at 6 months from today
                          const capEnd = end > formMaxDate ? formMaxDate : end;
                          setForm(f => ({
                            ...f,
                            duration: opt.value,
                            endYear:  String(capEnd.getFullYear()),
                            endMonth: String(capEnd.getMonth()+1),
                            endDay:   String(capEnd.getDate()),
                          }));
                        } else {
                          setForm(f => ({...f, duration: opt.value, endYear:"", endMonth:"", endDay:""}));
                        }
                      }}
                    >
                      {opt.value}
                      <span className="duration-btn-sub">{opt.sub}</span>
                    </button>
                  ))}
                </div>

                {/* 종료일 표시 — 상시 제외하고 선택된 경우 보여줌 */}
                {form.duration !== "상시" && (() => {
                  const ey = form.endYear, em = form.endMonth, ed = form.endDay;
                  const filled = ey && em && ed;
                  if (!filled && form.duration !== "직접입력") return null;
                  return (
                    <div style={{marginTop:10}}>
                      <div className="date-range-label" style={{marginBottom:5}}> 종료일</div>
                      <button
                        style={{
                          width:"100%", padding:"12px 14px", borderRadius:11, textAlign:"left",
                          background: filled ? "rgba(163,71,255,0.08)" : "var(--card2)",
                          border: `1.5px solid ${formErrors.endDate ? "var(--accent2)" : filled ? "#a347ff" : "var(--border)"}`,
                          color: filled ? "#a347ff" : "var(--muted)",
                          fontFamily:"'Pretendard',sans-serif", fontSize:13,
                          fontWeight: filled ? 700 : 500,
                          cursor: form.duration === "직접입력" ? "pointer" : "default",
                          transition:"all 0.2s",
                          display:"flex", alignItems:"center", gap:8,
                        }}
                        onClick={() => {
                          if (form.duration !== "직접입력") return;
                          const base = ey && em ? new Date(parseInt(ey), parseInt(em)-1, 1) : new Date(todayForForm);
                          setFormCalViewYear(base.getFullYear());
                          setFormCalViewMonth(base.getMonth());
                          setFormCalOpen("end");
                        }}
                      >
                        <span></span>
                        {filled
                          ? `${ey}년 ${em}월 ${ed}일${form.duration !== "직접입력" ? ` (${form.duration})` : ""}`
                          : "종료일을 선택해주세요"}
                        {form.duration === "직접입력" && <span style={{marginLeft:"auto", fontSize:11, color:"var(--muted)"}}>탭하여 변경</span>}
                      </button>
                      {formErrors.endDate && <div className="form-field-error">⚠ {formErrors.endDate}</div>}
                    </div>
                  );
                })()}
                {form.duration === "상시" && (
                  <div style={{marginTop:8, fontSize:12, color:"var(--muted)", padding:"8px 10px", background:"var(--card2)", borderRadius:9}}>
                    ♾️ 종료일 없이 상시 운영
                  </div>
                )}
              </div>

              <div className={`form-group ${formErrors.maxMembers ? "has-error" : ""}`}>
                <div className="form-label">최대 인원 <span style={{color:"var(--accent2)"}}>*</span></div>
                <input
                  className={`form-input ${formErrors.maxMembers ? "has-error" : ""}`}
                  type="number" min="2" max="100"
                  value={form.maxMembers}
                  onChange={e => {
                    setFormErrors(err => ({...err, maxMembers: undefined}));
                    setForm(f => ({ ...f, maxMembers: e.target.value }));
                  }}
                />
                {formErrors.maxMembers && <div className="form-field-error">⚠ {formErrors.maxMembers}</div>}
              </div>

              {/* Submit error summary */}
              {Object.keys(formErrors).filter(k => formErrors[k]).length > 0 && (
                <div className="form-submit-errors">
                  <div className="form-submit-errors-title">⚠ 아래 항목을 확인해주세요</div>
                  {[
                    formErrors.title      && { icon:"✏️", msg: formErrors.title },
                    formErrors.location   && { icon:"", msg: formErrors.location },
                    formErrors.days       && { icon:"", msg: formErrors.days },
                    formErrors.startDate  && { icon:"", msg: formErrors.startDate },
                    formErrors.endDate    && { icon:"", msg: formErrors.endDate },
                    formErrors.maxMembers && { icon:"", msg: formErrors.maxMembers },
                  ].filter(Boolean).map((item, i) => (
                    <div key={i} className="form-submit-error-item">
                      <span>{item.icon}</span> {item.msg}
                    </div>
                  ))}
                </div>
              )}

              <button className="submit-btn" onClick={handleCreate} style={{ marginTop: 4 }}>
                소모임 만들기 
              </button>
            </div>
          </div>
        )}

        {/* ── Form Calendar Modal ── */}
        {formCalOpen && creating && (() => {
          const isTodayFn = (y, m, d) => {
            const t = todayForForm;
            return y === t.getFullYear() && m === t.getMonth() && d === t.getDate();
          };
          const isBeforeToday = (y, m, d) => new Date(y,m,d) < todayForForm;
          const isAfterMax    = (y, m, d) => new Date(y,m,d) > formMaxDate;

          const isBeforeStart = (y, m, d) => {
            if (formCalOpen !== "end") return false;
            if (!form.startYear || !form.startMonth || !form.startDay) return false;
            return new Date(y,m,d) < new Date(
              parseInt(form.startYear), parseInt(form.startMonth)-1, parseInt(form.startDay)
            );
          };

          const cells = (() => {
            const firstDay = new Date(formCalViewYear, formCalViewMonth, 1).getDay();
            const total = new Date(formCalViewYear, formCalViewMonth+1, 0).getDate();
            const arr = [];
            for (let i=0;i<firstDay;i++) arr.push(null);
            for (let d=1;d<=total;d++) arr.push(d);
            return arr;
          })();

          const selY = formCalOpen === "start" ? form.startYear : form.endYear;
          const selM = formCalOpen === "start" ? form.startMonth : form.endMonth;
          const selD = formCalOpen === "start" ? form.startDay : form.endDay;
          const isSelected = (d) => selY && selM && selD &&
            parseInt(selY) === formCalViewYear &&
            parseInt(selM)-1 === formCalViewMonth &&
            parseInt(selD) === d;

          const canPrev = () => {
            const prev = new Date(formCalViewYear, formCalViewMonth-1, 1);
            return prev >= new Date(todayForForm.getFullYear(), todayForForm.getMonth(), 1);
          };
          const canNext = () => {
            const next = new Date(formCalViewYear, formCalViewMonth+1, 1);
            return next <= new Date(formMaxDate.getFullYear(), formMaxDate.getMonth(), 1);
          };

          return (
            <div className="form-cal-overlay" style={{maxWidth:430, margin:"0 auto"}}>
              <div className="form-cal-backdrop" onClick={() => setFormCalOpen(null)} />
              <div className="form-cal-sheet">
                <div className="form-cal-handle" />
                <div className="form-cal-title">
                  {formCalOpen === "start" ? " 시작일 선택" : " 종료일 선택"}
                </div>
                <div className="form-cal-sub">오늘부터 6개월 이내 날짜만 선택 가능해요</div>

                {/* Start date context (for end selection) */}
                {formCalOpen === "end" && (
                  <div style={{
                    display:"flex", alignItems:"center", gap:10, padding:"10px 12px",
                    background:"var(--card2)", borderRadius:10, marginBottom:14,
                    border:"1px solid var(--border)",
                  }}>
                    <div style={{fontSize:12, color:"var(--muted)"}}> 시작일</div>
                    <div style={{
                      fontSize:13, fontWeight:700,
                      color: form.startYear && form.startMonth && form.startDay ? "#a347ff" : "var(--muted)"
                    }}>
                      {form.startYear && form.startMonth && form.startDay
                        ? `${form.startYear}년 ${form.startMonth}월 ${form.startDay}일`
                        : "미선택"}
                    </div>
                    <div style={{color:"var(--muted)", margin:"0 2px"}}>→</div>
                    <div style={{fontSize:12, color:"var(--muted)"}}> 종료일 선택 중...</div>
                  </div>
                )}

                {/* Month navigation */}
                <div className="cal-header">
                  <div className="cal-month-label">{formCalViewYear}년 {KO_MONTHS[formCalViewMonth]}</div>
                  <div className="cal-nav">
                    <button className="cal-nav-btn" disabled={!canPrev()} onClick={() => {
                      if (formCalViewMonth===0) { setFormCalViewMonth(11); setFormCalViewYear(y=>y-1); }
                      else setFormCalViewMonth(m=>m-1);
                    }}>‹</button>
                    <button className="cal-nav-btn" disabled={!canNext()} onClick={() => {
                      if (formCalViewMonth===11) { setFormCalViewMonth(0); setFormCalViewYear(y=>y+1); }
                      else setFormCalViewMonth(m=>m+1);
                    }}>›</button>
                  </div>
                </div>

                <div className="cal-weekdays">
                  {KO_WEEKDAYS.map(w=><div key={w} className="cal-weekday">{w}</div>)}
                </div>

                <div className="cal-grid">
                  {cells.map((day, i) => {
                    if (!day) return <div key={`fc-e-${i}`} className="cal-day empty" />;
                    const disabled = isBeforeToday(formCalViewYear, formCalViewMonth, day)
                      || isAfterMax(formCalViewYear, formCalViewMonth, day)
                      || isBeforeStart(formCalViewYear, formCalViewMonth, day);
                    const today_ = isTodayFn(formCalViewYear, formCalViewMonth, day);
                    const sel = isSelected(day);
                    return (
                      <button key={day}
                        className={["cal-day", disabled?"disabled":"", today_?"today":"", sel?"selected":""].join(" ").trim()}
                        onClick={() => {
                          if (disabled) return;
                          const yStr = String(formCalViewYear);
                          const mStr = String(formCalViewMonth+1);
                          const dStr = String(day);
                          if (formCalOpen === "start") {
                            setForm(f => ({...f, startYear:yStr, startMonth:mStr, startDay:dStr}));
                            setFormErrors(e => ({...e, startDate: undefined}));
                            setFormCalOpen(null);
                          } else {
                            setForm(f => ({...f, endYear:yStr, endMonth:mStr, endDay:dStr}));
                            setFormErrors(e => ({...e, endDate: undefined}));
                            setFormCalOpen(null); // auto-close after selection
                          }
                        }}
                      >{day}</button>
                    );
                  })}
                </div>

                <button className="form-cal-confirm"
                  disabled={formCalOpen === "end" && !(form.startYear&&form.startMonth&&form.startDay)}
                  onClick={() => setFormCalOpen(null)}
                >
                  {formCalOpen === "end" && form.endYear&&form.endMonth&&form.endDay
                    ? `${form.endYear}년 ${form.endMonth}월 ${form.endDay}일 확정`
                    : "날짜를 선택해주세요"}
                </button>
                <button className="form-cal-reset" onClick={() => {
                  if (formCalOpen === "start") {
                    setForm(f=>({...f, startYear: String(todayForForm.getFullYear()), startMonth: String(todayForForm.getMonth()+1), startDay: String(todayForForm.getDate())}));
                  } else {
                    setForm(f=>({...f, endYear:"", endMonth:"", endDay:""}));
                  }
                  setFormCalOpen(null);
                }}>취소</button>
              </div>
            </div>
          );
        })()}

        {/* ===== MYPAGE ===== */}
        {mypageOpen && (
          <div className="mypage-overlay">
            {/* Cover */}
            <div className="mp-cover">
              <div className="mp-cover-pattern" />
              <div className="mp-cover-lines" />
              <button className="mp-back-btn" onClick={() => { setMypageOpen(false); setEditing(false); }}>←</button>
              <button
                className={`mp-edit-btn ${editing ? "editing" : ""}`}
                onClick={() => {
                  if (editing) {
                    setProfile({ ...editProfile });
                    showToast("✅ 프로필이 저장되었어요");
                  } else {
                    setEditProfile({ ...profile });
                  }
                  setEditing(!editing);
                }}
              >
                {editing ? "저장" : "편집"}
              </button>
            </div>

            {/* Profile */}
            <div className="mp-profile-section">
              <div className="mp-avatar-wrap">
                {avatarImg
                  ? <img src={avatarImg} style={{width:88,height:88,borderRadius:"50%",objectFit:"cover",border:"3px solid var(--accent)",display:"block"}} alt="프로필" />
                  : <div className="mp-avatar-big">🏃</div>
                }
                {editing && (
                  <>
                    <label htmlFor="avatar-upload" style={{cursor:"pointer"}}>
                      <div className="mp-avatar-edit">📷</div>
                    </label>
                    <input id="avatar-upload" type="file" accept="image/*" style={{display:"none"}} onChange={handleAvatarUpload} />
                  </>
                )}
              </div>
              <div className="mp-level-badge">⚡ LV.7 · 파워러너</div>
              <div className="mp-name">
                {editing
                  ? <input className="mp-info-input" style={{ fontSize: 24, fontFamily: "'Pretendard', sans-serif", letterSpacing: "1px", width: 160 }} value={editProfile.name} onChange={e => setEditProfile(p => ({ ...p, name: e.target.value }))} />
                  : profile.name
                }
              </div>
              {editingHandle ? (
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                  <span style={{fontSize:13,color:"var(--muted)"}}>@</span>
                  <input
                    style={{flex:1,background:"var(--card2)",border:"1.5px solid var(--accent)",borderRadius:9,padding:"6px 10px",color:"var(--text)",fontFamily:"'Pretendard',sans-serif",fontSize:13,outline:"none"}}
                    value={handleDraft}
                    autoFocus
                    onChange={e => { setHandleDraft(e.target.value); setHandleError(""); }}
                    onKeyDown={e => { if(e.key==="Enter") confirmHandle(); if(e.key==="Escape") setEditingHandle(false); }}
                  />
                  <button onClick={confirmHandle} style={{padding:"6px 12px",borderRadius:8,background:"var(--accent)",color:"#000",border:"none",fontFamily:"inherit",fontSize:12,fontWeight:700,cursor:"pointer"}}>저장</button>
                  <button onClick={() => setEditingHandle(false)} style={{padding:"6px 10px",borderRadius:8,background:"var(--card2)",color:"var(--muted)",border:"1px solid var(--border)",fontFamily:"inherit",fontSize:12,cursor:"pointer"}}>취소</button>
                </div>
              ) : (
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                  <span className="mp-handle">{profile.handle}</span>
                  {editing && <button onClick={openHandleEdit} style={{background:"none",border:"none",color:"var(--accent)",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit",padding:"2px 6px",borderRadius:6,border:"1px dashed var(--accent)"}}>편집</button>}
                </div>
              )}
              {handleError && <div style={{fontSize:11,color:"var(--accent2)",marginBottom:4}}>{handleError}</div>}

              {editing
                ? <textarea className="mp-bio-input" value={editProfile.bio} onChange={e => setEditProfile(p => ({ ...p, bio: e.target.value }))} />
                : <div className="mp-bio">{profile.bio}</div>
              }

              <div className="mp-tags-row">
                {(editing ? editProfile : profile).sports.length === 0
                  ? <span className="mp-sport-tag" style={{color:"var(--muted)"}}>관심 종목 없음</span>
                  : (editing ? editProfile : profile).sports.map(s => (
                      <span key={s} className="mp-sport-tag active">{s}</span>
                    ))
                }
                {editing && (
                  <button
                    style={{padding:"4px 12px",borderRadius:100,border:"1.5px dashed var(--accent)",background:"transparent",color:"var(--accent)",fontFamily:"inherit",fontSize:12,fontWeight:700,cursor:"pointer"}}
                    onClick={() => setMpSportModalOpen(true)}
                  >+ 편집</button>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="mp-stats">
              <div className="mp-stat-card">
                <div className="mp-stat-num">{joined.size}</div>
                <div className="mp-stat-label">참석 소모임</div>
              </div>
              <div className="mp-stat-card">
                <div className="mp-stat-num">{totalWorkouts}</div>
                <div className="mp-stat-label">총 운동 횟수</div>
              </div>
              <div className="mp-stat-card">
                <div className="mp-stat-num">{totalKm}</div>
                <div className="mp-stat-label">총 km</div>
              </div>
            </div>

            {/* Level Progress */}
            <div className="mp-section">
              <div className="mp-section-title">레벨 진행도</div>
              <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 18, letterSpacing: 1 }}>⚡ LV.7 파워러너</div>
                    <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>다음 레벨: LV.8 엘리트</div>
                  </div>
                  <div style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 22, color: "var(--accent)" }}>720<span style={{ fontSize: 13, color: "var(--muted)" }}>/1000</span></div>
                </div>
                <div className="mp-progress-bar">
                  <div className="mp-progress-fill" style={{ width: "72%" }} />
                </div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 6 }}>280 포인트 더 모으면 레벨업!</div>
              </div>
            </div>

            {/* Activity Heatmap */}
            <div className="mp-section">
              <div className="mp-section-title">최근 3개월 활동</div>
              <div className="heatmap">
                {heatmapData.map((val, i) => {
                  const d = new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate() - (90 - i));
                  const label = `${d.getMonth()+1}/${d.getDate()} (${["일","월","화","수","목","금","토"][d.getDay()]}) ${val > 0 ? `— ${val}개 모임 활동` : "— 활동 없음"}`;
                  return (
                    <div key={i} className="heatmap-cell" style={{ background: heatColors[val] }} title={label} />
                  );
                })}
              </div>
            </div>

            {/* Achievements */}
            <div className="mp-section">
              <div className="mp-section-title">업적</div>
              <div className="achievement-grid">
                {achievements.map((a, i) => (
                  <div key={i} className={`achievement ${a.earned ? "earned" : "locked"}`}>
                    <div className="achievement-emoji">{a.emoji}</div>
                    <div className="achievement-name">{a.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Personal Info */}
            <div className="mp-section">
              <div className="mp-section-title">회원 정보</div>
              <div className="mp-info-list">
                {[
                  { icon: "", bg: "rgba(232,255,71,0.1)", label: "이름", key: "name" },
                  { icon: "", bg: "rgba(255,107,53,0.1)", label: "나이", key: "age" },
                  { icon: "⚧", bg: "rgba(71,201,255,0.1)", label: "성별", key: "gender" },
                  { icon: "", bg: "rgba(163,71,255,0.1)", label: "전화번호", key: "phone" },
                  { icon: "", bg: "rgba(255,71,163,0.1)", label: "이메일", key: "email" },
                  { icon: "", bg: "rgba(71,255,163,0.1)", label: "활동 지역", key: "region" },
                ].map(({ icon, bg, label, key }) => (
                  <div key={key} className="mp-info-row">
                    <div className="mp-info-icon" style={{ background: bg }}>{icon}</div>
                    <div className="mp-info-content">
                      <div className="mp-info-label">{label}</div>
                      {editing
                        ? <input className="mp-info-input" value={editProfile[key]} onChange={e => setEditProfile(p => ({ ...p, [key]: e.target.value }))} />
                        : <div className="mp-info-value">{profile[key]}</div>
                      }
                    </div>
                    {!editing && <span className="mp-info-arrow">›</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Settings */}
            <div className="mp-section">
              <div className="mp-section-title">설정</div>
              <div className="mp-settings-list">
                <div className="mp-setting-row" onClick={() => setNotifPush(!notifPush)}>
                  <div className="mp-setting-icon" style={{ background: "rgba(232,255,71,0.1)" }}></div>
                  <span className="mp-setting-label">푸시 알림</span>
                  <div className={`toggle ${notifPush ? "on" : ""}`} />
                </div>
                <div className="mp-setting-row" onClick={() => setNotifChat(!notifChat)}>
                  <div className="mp-setting-icon" style={{ background: "rgba(71,201,255,0.1)" }}></div>
                  <span className="mp-setting-label">채팅 알림</span>
                  <div className={`toggle ${notifChat ? "on" : ""}`} />
                </div>
                <div className="mp-setting-row">
                  <div className="mp-setting-icon" style={{ background: "rgba(163,71,255,0.1)" }}></div>
                  <span className="mp-setting-label">개인정보 보호</span>
                  <span className="mp-setting-value">공개</span>
                  <span className="mp-setting-arrow">›</span>
                </div>
                <div className="mp-setting-row">
                  <div className="mp-setting-icon" style={{ background: "rgba(255,107,53,0.1)" }}></div>
                  <span className="mp-setting-label">앱 버전</span>
                  <span className="mp-setting-value">v2.4.1</span>
                </div>
                <div className="mp-setting-row">
                  <div className="mp-setting-icon" style={{ background: "rgba(255,255,255,0.04)" }}></div>
                  <span className="mp-setting-label">이용약관</span>
                  <span className="mp-setting-arrow">›</span>
                </div>
              </div>
            </div>

            {/* Logout */}
            <div className="mp-section">
              <button className="mp-logout-btn" onClick={handleLogout}>
                로그아웃
              </button>
            </div>

            <div style={{ height: 40 }} />
          </div>
        )}
      </div>
      )}

    </>
  );
}

export default App;
