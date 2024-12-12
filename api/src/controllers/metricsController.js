const Booking = require("../models/Booking");
const User = require("../models/User");
const Room = require("../models/Room");

// Helper function to get the start and end of the current day
const getCurrentDayRange = () => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    return { start, end };
};

// Total Bookings
const getTotalBookings = async (req, res) => {
    try {
        const totalBookings = await Booking.countDocuments({});
        res.json({ totalBookings });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch total bookings" });
    }
};

// Active Users
const getActiveUsers = async (req, res) => {
    try {
        const activeUsers = await Booking.distinct("customerEmail", { status: "confirmed" });
        res.json({ activeUsers: activeUsers.length });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch active users" });
    }
};

// Total Registered Users
const getTotalUsers = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({});
        res.json({ totalUsers });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch total registered users" });
    }
};

// Room Distribution
const getRoomDistribution = async (req, res) => {
    try {
        const { start, end } = getCurrentDayRange();

        // Find rooms with at least one booking for the current day and status "confirmed"
        const occupiedRooms = await Room.countDocuments({
            bookings: {
                $elemMatch: {
                    checkIn: { $lte: end }, // Check-in on or before today
                    checkOut: { $gte: start }, // Check-out on or after today
                    status: "confirmed",
                },
            },
        });

        // Total rooms
        const totalRooms = await Room.countDocuments({});

        // Vacant rooms
        const vacantRooms = totalRooms - occupiedRooms;

        res.json({ occupiedRooms, vacantRooms });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch room distribution" });
    }
};


// Booking Trends
const getBookingTrends = async (req, res) => {
    try {
        const currentDate = new Date();

        // Calculate start and end months
        const startMonth = new Date(currentDate);
        startMonth.setMonth(currentDate.getMonth() - 4); // 4 months ago
        startMonth.setDate(1);
        startMonth.setHours(0, 0, 0, 0);

        const endMonth = new Date(currentDate);
        endMonth.setMonth(currentDate.getMonth() + 3); // 3 months in the future
        endMonth.setDate(1);
        endMonth.setHours(0, 0, 0, 0);

        // Aggregate bookings within the specified range
        const trends = await Booking.aggregate([
            { $match: { status: "confirmed", checkIn: { $gte: startMonth, $lt: endMonth } } }, // Filter by status and date range
            {
                $group: {
                    _id: { $month: "$checkIn" }, // Group by check-in month
                    bookings: { $sum: 1 },
                },
            },
            { $sort: { "_id": 1 } }, // Sort by month
        ]);

        // Generate the full range of months with empty values if needed
        const formattedTrends = Array.from({ length: 8 }, (_, index) => {
            const date = new Date(currentDate);
            date.setMonth(currentDate.getMonth() - 4 + index); // From 4 months ago to 3 months ahead
            const monthName = date.toLocaleString("default", { month: "short" });
            const trend = trends.find((t) => t._id === date.getMonth() + 1);
            return {
                month: monthName,
                bookings: trend ? trend.bookings : 0,
            };
        });

        res.json({ trends: formattedTrends });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch booking trends" });
    }
};





// Revenue Trends
const getRevenueTrends = async (req, res) => {
    try {
        const currentDate = new Date();

        // Calculate the start and end months
        const startMonth = new Date(currentDate);
        startMonth.setMonth(currentDate.getMonth() - 4); // 4 months ago
        startMonth.setDate(1);
        startMonth.setHours(0, 0, 0, 0);

        const endMonth = new Date(currentDate);
        endMonth.setMonth(currentDate.getMonth() + 3); // 3 months in the future
        endMonth.setDate(1);
        endMonth.setHours(0, 0, 0, 0);

        // Aggregate revenue within the specified date range
        const trends = await Room.aggregate([
            { $unwind: "$bookings" }, // Flatten bookings array
            {
                $match: {
                    "bookings.status": "confirmed",
                    "bookings.checkIn": { $gte: startMonth, $lt: endMonth },
                },
            },
            {
                $group: {
                    _id: { $month: "$bookings.checkIn" }, // Group by month of check-in
                    revenue: {
                        $sum: {
                            $multiply: [
                                "$price", // Room price
                                {
                                    $add: [
                                        { $subtract: [{ $toLong: "$bookings.checkOut" }, { $toLong: "$bookings.checkIn" }] },
                                        86400000, // Include same-day bookings (1 day in milliseconds)
                                    ],
                                },
                            ],
                        },
                    },
                },
            },
            { $sort: { "_id": 1 } }, // Sort by month
        ]);

        // Format trends with specified months
        const formattedTrends = Array.from({ length: 8 }, (_, index) => {
            const date = new Date(currentDate);
            date.setMonth(currentDate.getMonth() - 4 + index); // Move from 4 months ago to 3 months ahead
            const monthName = date.toLocaleString("default", { month: "short" });
            const trend = trends.find((t) => t._id === date.getMonth() + 1);
            return {
                month: monthName,
                revenue: trend ? trend.revenue / 86400000 : 0, // Convert milliseconds to days
            };
        });

        res.json({ trends: formattedTrends });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch revenue trends" });
    }
};




module.exports = {
    getTotalBookings,
    getActiveUsers,
    getTotalUsers,
    getRoomDistribution,
    getBookingTrends,
    getRevenueTrends,
};
