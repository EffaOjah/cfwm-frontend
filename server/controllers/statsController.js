const Testimony = require('../models/testimony.js');
const Event = require('../models/event.js');
const Sermon = require('../models/sermon.js');

const statsController = {
    getDashboardOverview: async (req, res) => {
        try {
            const now = new Date();
            const thisYear = now.getFullYear();
            const thisMonth = now.getMonth() + 1;

            const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            const lastYear = lastMonthDate.getFullYear();
            const lastMonth = lastMonthDate.getMonth() + 1;

            const [
                testimonyCount, eventCount, sermonCount,
                recentTestimonies,
                thisMonthCount, lastMonthCount,
                recentEvents, recentSermons
            ] = await Promise.all([
                Testimony.getCount(),
                Event.getCount(),
                Sermon.getCount(),
                Testimony.getRecent(5),
                Testimony.getCountByMonth(thisYear, thisMonth),
                Testimony.getCountByMonth(lastYear, lastMonth),
                Event.getRecent(3),
                Sermon.getRecent(3)
            ]);

            // Calculate testimony percentage change
            let testimonyTrend = null;
            if (lastMonthCount > 0) {
                const change = ((thisMonthCount - lastMonthCount) / lastMonthCount) * 100;
                testimonyTrend = `${change >= 0 ? '+' : ''}${change.toFixed(0)}% this month`;
            } else if (thisMonthCount > 0) {
                testimonyTrend = 'New this month';
            } else {
                testimonyTrend = 'No change';
            }

            // Build unified activity feed
            const activityItems = [
                ...recentTestimonies.slice(0, 3).map(t => ({
                    type: 'testimony',
                    title: 'New Testimony Submitted',
                    desc: `${t.name} shared a testimony.`,
                    date: t.created_at
                })),
                ...recentEvents.map(e => ({
                    type: 'event',
                    title: 'New Event Created',
                    desc: `"${e.title}" was added to the calendar.`,
                    date: e.created_at
                })),
                ...recentSermons.map(s => ({
                    type: 'sermon',
                    title: 'New Sermon Added',
                    desc: `"${s.title}" by ${s.speaker}.`,
                    date: s.created_at
                }))
            ];

            // Sort by most recent and take top 5
            activityItems.sort((a, b) => new Date(b.date) - new Date(a.date));
            const recentActivity = activityItems.slice(0, 5);

            res.status(200).json({
                counts: {
                    testimonies: testimonyCount,
                    events: eventCount,
                    sermons: sermonCount
                },
                trends: {
                    testimonies: testimonyTrend
                },
                recentTestimonies,
                recentActivity
            });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
        }
    }
};

module.exports = statsController;
