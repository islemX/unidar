/**
 * UNIDAR – Messages Page
 */
import Head from 'next/head';
import Script from 'next/script';

export default function MessagesPage() {
  return (
    <>
      <Head><title>Messages - UNIDAR</title></Head>
      <nav className="navbar glass">
        <div className="nav-container">
          <a href="/" className="nav-logo">
            <img src="/logo.svg" alt="UNIDAR" style={{height:'40px',width:'auto',display:'block'}} />
          </a>
          <div className="nav-links">
            <a href="/listings" className="nav-link">Listings</a>
            <a href="/user-dashboard" className="nav-link" id="dashLink">Dashboard</a>
          </div>
        </div>
      </nav>

      <main className="section" style={{ height: 'calc(100vh - 70px)', padding: 0 }}>
        <div style={{ display: 'flex', height: '100%', background: 'white' }}>
          {/* Inbox Sidebar */}
          <div style={{ width: 320, borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid var(--color-border)' }}>
              <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Inbox</h2>
            </div>
            <div id="inboxList" style={{ flex: 1, overflowY: 'auto' }}>
              <p style={{ padding: 20, textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading conversations…</p>
            </div>
          </div>

          {/* Chat Window */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
            <div id="chatHeader" style={{ padding: '16px 24px', background: 'white', borderBottom: '1px solid var(--color-border)', display: 'none' }}>
              <h3 id="otherUserName" style={{ margin: 0 }}>Chat</h3>
            </div>
            <div id="messagesArea" style={{ flex: 1, padding: 24, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                <div style={{ fontSize: '3rem', marginBottom: 16 }}>💬</div>
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
            <div id="chatInputArea" style={{ padding: 20, background: 'white', borderTop: '1px solid var(--color-border)', display: 'none' }}>
              <form id="msgForm" style={{ display: 'flex', gap: 12 }}>
                <input type="text" id="msgInput" className="form-input" placeholder="Type a message…" required style={{ borderRadius: 24 }} />
                <button type="submit" className="btn btn-primary" style={{ borderRadius: 24, padding: '0 24px' }}>Send</button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Script id="messages-logic" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
        let activeConvId = null;
        let pollTimer = null;
        let allConvs = [];

        async function loadInbox() {
          const api = window.UNIDAR_API;
          if (!api) return;
          try {
            const data = await api.Conversations.getAll();
            const list = document.getElementById('inboxList');
            allConvs = data.conversations || [];
            if (!list) return;
            
            if (!allConvs.length) {
              list.innerHTML = '<p style="padding:20px;text-align:center;color:#94a3b8">No conversations yet</p>';
              return;
            }

            list.innerHTML = allConvs.map(c => {
              const isActive = activeConvId == c.id;
              const bg = isActive ? 'background:var(--color-primary-50);border-left:4px solid var(--color-brand)' : '';
              const time = new Date(c.updated_at).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
              const unread = c.unread_count > 0 ? '<span style="background:var(--color-brand);color:white;font-size:0.7rem;padding:2px 6px;border-radius:10px">' + c.unread_count + '</span>' : '';
              
              return '<div onclick="openConv(' + c.id + ', \\'' + c.other_user_name.replace(/'/g, "\\\\'") + '\\')" style="padding:16px 20px;border-bottom:1px solid #f1f5f9;cursor:pointer;transition:background 0.2s;' + bg + '">' +
                '<div style="display:flex;justify-content:space-between;margin-bottom:4px">' +
                  '<strong>' + c.other_user_name + '</strong>' +
                  '<span style="font-size:0.75rem;color:#94a3b8">' + time + '</span>' +
                '</div>' +
                '<div style="display:flex;justify-content:space-between;align-items:center">' +
                  '<p style="margin:0;font-size:0.85rem;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:180px">' + (c.last_message || 'No messages yet') + '</p>' +
                  unread +
                '</div>' +
              '</div>';
            }).join('');
          } catch (err) { console.error(err); }
        }

        async function openConv(id, name) {
          activeConvId = id;
          if (document.getElementById('chatHeader')) document.getElementById('chatHeader').style.display = 'block';
          if (document.getElementById('chatInputArea')) document.getElementById('chatInputArea').style.display = 'block';
          if (document.getElementById('otherUserName')) document.getElementById('otherUserName').textContent = name;
          loadMessages();
          loadInbox();
          if (pollTimer) clearInterval(pollTimer);
          pollTimer = setInterval(loadMessages, 3000);
          
          const url = new URL(window.location);
          url.searchParams.set('id', id);
          window.history.pushState({}, '', url);
        }

        async function loadMessages() {
          if (!activeConvId) return;
          const api = window.UNIDAR_API;
          if (!api) return;
          try {
            const data = await api.Messages.getMessages(activeConvId);
            const area = document.getElementById('messagesArea');
            if (!area) return;
            const msgs = data.messages || [];
            const auth = await api.Auth.check();
            const myId = auth.user.id;

            area.innerHTML = msgs.map(m => {
              const mine = m.sender_id === myId;
              const align = mine ? 'flex-end' : 'flex-start';
              const bg = mine ? 'var(--color-brand)' : 'white';
              const color = mine ? 'white' : 'black';
              const time = new Date(m.created_at).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
              
              return '<div style="max-width:70%;padding:10px 16px;border-radius:16px;font-size:0.95rem;align-self:' + align + ';background:' + bg + ';color:' + color + ';box-shadow:0 1px 2px rgba(0,0,0,0.05)">' +
                m.message +
                '<div style="font-size:0.7rem;margin-top:4px;opacity:0.7;text-align:right">' + time + '</div>' +
              '</div>';
            }).join('');
            area.scrollTop = area.scrollHeight;
          } catch (err) { console.error(err); }
        }

        document.getElementById('msgForm')?.addEventListener('submit', async (e) => {
          e.preventDefault();
          if (!activeConvId) return;
          const api = window.UNIDAR_API;
          if (!api) return;
          const input = document.getElementById('msgInput');
          const msg = input.value;
          input.value = '';
          try {
            await api.Messages.send({ conversation_id: activeConvId, message: msg });
            loadMessages();
            loadInbox();
          } catch (err) { alert(err.message); }
        });

        async function init() {
          const api = window.UNIDAR_API;
          if (!api) return;
          const auth = await api.Auth.check();
          if (!auth || !auth.authenticated) { window.location.href = '/login'; return; }
          const dash = document.getElementById('dashLink');
          if (dash) dash.href = auth.user.role === 'admin' ? '/admin' : (auth.user.role === 'owner' ? '/owner-listings' : '/user-dashboard');

          await loadInbox();
          const qid = new URLSearchParams(window.location.search).get('id');
          if (qid) {
             let name = 'Chat';
             const c = allConvs.find(x => x.id == qid);
             if (c) name = c.other_user_name;
             openConv(qid, name);
          }
        }

        init();
      ` }} />
    </>
  );
}
