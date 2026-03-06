import { Search, Mail, MailOpen, Plus, Clock, Inbox as InboxIcon, Send, Archive, Trash2, CheckCircle2, Loader2 } from 'lucide-react';

export default function Inbox() {
    const [activeTab, setActiveTab] = useState('inbox');
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
    const [replyText, setReplyText] = useState('');
    const [sendingReply, setSendingReply] = useState(false);

    useEffect(() => {
        // Mock data fetch for inbox since receiving real emails requires MX record / Webhook setup
        setTimeout(() => {
            const mockMessages = [
                {
                    id: '1',
                    sender_name: 'John Doe',
                    sender_email: 'john.doe@example.com',
                    subject: 'Question about Commercial Duct Cleaning',
                    preview: 'Hello, our office building needs a complete duct cleaning. Can you...',
                    body: 'Hello, our office building needs a complete duct cleaning. Can you provide an estimate for a 10,000 sq ft building built in 1995? We are located in downtown LA.',
                    date: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
                    read: false,
                    folder: 'inbox',
                    related_prospect_id: null,
                },
                {
                    id: '2',
                    sender_name: 'Sarah Smith',
                    sender_email: 'sarah.smith@hoa-management.com',
                    subject: 'Re: Professional Air Duct Cleaning for Sunset HOA',
                    preview: 'Yes, we are interested in discussing this further. Please call me...',
                    body: 'Yes, we are interested in discussing this further. Please call me at 555-0192 to schedule a walkthrough of the properties.',
                    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
                    read: true,
                    folder: 'inbox',
                    related_prospect_id: '123',
                },
                {
                    id: '3',
                    sender_name: 'System Notifications',
                    sender_email: 'system@pureaircalifornia.com',
                    subject: 'Invoice #INV-202403-001 Viewed',
                    preview: 'Customer Michael Jordan has viewed the invoice...',
                    body: 'Customer Michael Jordan has viewed the invoice you sent them on March 1st. They have not yet made a payment.',
                    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
                    read: true,
                    folder: 'notifications',
                }
            ];
            setMessages(mockMessages);
            setLoading(false);
        }, 800);
    }, []);

    const filteredMessages = messages.filter(m => {
        if (activeTab === 'inbox') return m.folder === 'inbox';
        if (activeTab === 'sent') return m.folder === 'sent';
        if (activeTab === 'archive') return m.folder === 'archive';
        return true;
    });

    const handleSelectMessage = (msg: any) => {
        setSelectedMessage(msg);
        if (!msg.read) {
            setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, read: true } : m));
        }
    };

    const handleSendReply = () => {
        if (!replyText.trim() || !selectedMessage) return;
        setSendingReply(true);
        setTimeout(() => {
            alert('Reply sent! (Running in simulation mode without MX records)');
            setSendingReply(false);
            setReplyText('');
            // Add to messages UI as sent
            const newReply = {
                id: Date.now().toString(),
                sender_name: 'Pure Air Admin',
                sender_email: 'lou@pureaircalifornia.com',
                subject: `Re: ${selectedMessage.subject}`,
                preview: replyText.substring(0, 50) + '...',
                body: replyText,
                date: new Date().toISOString(),
                read: true,
                folder: 'sent'
            };
            setMessages(prev => [newReply, ...prev]);
        }, 1000);
    };

    const handleArchive = (id: string) => {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, folder: 'archive' } : m));
        if (selectedMessage?.id === id) setSelectedMessage(null);
    };

    return (
        <div className="flex h-[calc(100vh-8rem)] -mt-2 -mx-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 border-r border-gray-200 flex flex-col bg-gray-50/50">
                <div className="p-4 border-b border-gray-200">
                    <button className="w-full flex items-center justify-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-sky-700 transition">
                        <Plus className="w-4 h-4" />
                        Compose
                    </button>
                </div>
                <nav className="flex-1 p-3 space-y-1">
                    <button
                        onClick={() => setActiveTab('inbox')}
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'inbox' ? 'bg-sky-100 text-sky-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                        <div className="flex items-center gap-3">
                            <InboxIcon className="w-4 h-4" />
                            Inbox
                        </div>
                        {messages.filter(m => m.folder === 'inbox' && !m.read).length > 0 && (
                            <span className="bg-sky-600 text-white text-xs px-2 py-0.5 rounded-full">
                                {messages.filter(m => m.folder === 'inbox' && !m.read).length}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('sent')}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'sent' ? 'bg-sky-100 text-sky-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                        <Send className="w-4 h-4" />
                        Sent
                    </button>
                    <button
                        onClick={() => setActiveTab('archive')}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'archive' ? 'bg-sky-100 text-sky-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                        <Archive className="w-4 h-4" />
                        Archive
                    </button>
                </nav>
            </div>

            {/* Message List */}
            <div className="w-96 border-r border-gray-200 flex flex-col bg-white">
                <div className="p-4 border-b border-gray-200">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            className="w-full pl-9 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:border-sky-500 rounded-lg text-sm"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="flex justify-center p-8 text-sky-500"><Loader2 className="w-6 h-6 animate-spin" /></div>
                    ) : filteredMessages.length === 0 ? (
                        <div className="text-center p-8 text-sm text-gray-500">No messages in this folder</div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {filteredMessages.map(msg => (
                                <button
                                    key={msg.id}
                                    onClick={() => handleSelectMessage(msg)}
                                    className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${selectedMessage?.id === msg.id ? 'bg-sky-50/50' : ''}`}
                                >
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className={`text-sm truncate pr-2 ${msg.read ? 'text-gray-700' : 'text-gray-900 font-semibold'}`}>
                                            {msg.sender_name}
                                        </span>
                                        <span className={`text-xs flex-shrink-0 ${msg.read ? 'text-gray-500' : 'text-sky-600 font-medium'}`}>
                                            {new Date(msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <div className={`text-sm truncate mb-1 ${msg.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                                        {msg.subject}
                                    </div>
                                    <div className="text-xs text-gray-500 truncate">
                                        {msg.preview}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Thread View */}
            <div className="flex-1 flex flex-col bg-gray-50/30">
                {selectedMessage ? (
                    <>
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
                            <h2 className="text-lg font-semibold text-gray-900">{selectedMessage.subject}</h2>
                            <div className="flex items-center gap-2">
                                <button onClick={() => handleArchive(selectedMessage.id)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                                    <Archive className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 p-6 overflow-y-auto">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                                            {selectedMessage.sender_name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900">{selectedMessage.sender_name}</div>
                                            <div className="text-sm text-gray-500">&lt;{selectedMessage.sender_email}&gt;</div>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {new Date(selectedMessage.date).toLocaleString()}
                                    </span>
                                </div>
                                <div className="text-gray-800 text-sm whitespace-pre-wrap leading-relaxed">
                                    {selectedMessage.body}
                                </div>
                            </div>
                        </div>

                        {/* Reply Box */}
                        <div className="p-4 bg-white border-t border-gray-200">
                            <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Write a reply..."
                                className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-sky-500 outline-none resize-none h-24"
                            />
                            <div className="flex justify-end mt-3">
                                <button
                                    onClick={handleSendReply}
                                    disabled={!replyText.trim() || sendingReply}
                                    className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 transition"
                                >
                                    {sendingReply ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                    Send Reply
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                        <Mail className="w-16 h-16 mb-4 text-gray-300" />
                        <h3 className="text-lg font-medium text-gray-900">No message selected</h3>
                        <p className="text-sm">Select a message from your inbox to read and reply.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
