const { getLatestLocation, getVehicleLocationHistory } = require('./vehicles.repository');

async function getLatestLocationHandler(req, res) {
  const { vehicle_id } = req.params;

  if (!vehicle_id) {
    return res.status(400).json({ message: 'vehicle_id is required' });
  }

  if (typeof vehicle_id != 'string') {
    return res.status(400).json({ message: 'vehicle_id must be string' });
  }

  try {
    const location = await getLatestLocation(vehicle_id);

    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    return res.json(location);
  } catch (error) {
    console.error('Error fetching location:', error);
    return res.status(500).json({ message: error.message, error: 'Internal server error' });
  }
}

async function getVehicleHistory(req, res) {
  const { vehicle_id } = req.params;
  const { start, end } = req.query;
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;

  if (!vehicle_id) {
    return res.status(400).json({ message: 'vehicle_id is required' });
  }

  if (typeof vehicle_id != 'string') {
    return res.status(400).json({ message: 'vehicle_id must be string' });
  }

  if (!start || !end) {
    return res.status(400).json({ message: 'Query parameters start and end are required' });
  }

  try {
    const { data, totalCount } = await getVehicleLocationHistory({
      vehicle_id,
      start,
      end,
      limit,
      page,
    });

    if (!data.length) {
      return res.json({
        data: [],
        pagination: {
          total_data: 0,
          total_pages: 0,
        },
      });
    }

    return res.json({
      data: data.map((item) => ({
        ...item,
        latitude: +item.latitude,
        longitude: +item.longitude,
        timestamp: +item.timestamp,
      })),
      pagination: {
        total_data: +totalCount,
        total_pages: Math.ceil(+totalCount / limit),
      },
    });
  } catch (err) {
    console.error('Error getting vehicle history:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports = { getLatestLocationHandler, getVehicleHistory };
