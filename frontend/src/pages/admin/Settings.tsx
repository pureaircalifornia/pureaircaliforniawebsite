import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Building2, Loader2, Save, CheckCircle } from 'lucide-react';
import { getCompanySettings, updateCompanySettings } from '@/utils/api';

export default function Settings() {
    const [settings, setSettings] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await getCompanySettings();
                setSettings(data);
            } catch (err) {
                console.error('Failed to fetch settings:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        if (!settings) return;
        setSaving(true);
        setSaved(false);
        try {
            await updateCompanySettings({
                company_name: settings.company_name,
                contact: settings.contact
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            console.error('Failed to update settings:', err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                    <p className="text-sm text-gray-500 mt-1">Configure your pure air california franchise settings.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1 space-y-2">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-sky-700 bg-sky-50 transition-colors">
                        <Building2 className="w-4 h-4" /> Company Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                        <Bell className="w-4 h-4" /> Notifications
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                        <Shield className="w-4 h-4" /> Security
                    </button>
                </div>

                <div className="md:col-span-3">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">Company Profile</h2>

                        {loading ? (
                            <div className="flex justify-center py-8">
                                <Loader2 className="w-8 h-8 text-sky-500 animate-spin" />
                            </div>
                        ) : settings ? (
                            <div className="space-y-4 max-w-lg">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                                    <input
                                        type="text"
                                        value={settings.company_name}
                                        onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                                    <input
                                        type="email"
                                        value={settings.contact?.email || ''}
                                        onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, email: e.target.value } })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Support Phone</label>
                                    <input
                                        type="tel"
                                        value={settings.contact?.phone || ''}
                                        onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, phone: e.target.value } })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500"
                                    />
                                </div>

                                <div className="pt-4 flex items-center gap-4">
                                    <button
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors disabled:opacity-50"
                                    >
                                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                        Save Changes
                                    </button>
                                    {saved && (
                                        <span className="flex items-center gap-2 text-sm text-green-600 font-medium animate-pulse">
                                            <CheckCircle className="w-4 h-4" />
                                            Saved!
                                        </span>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="text-red-500 text-sm">Failed to load settings data.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
