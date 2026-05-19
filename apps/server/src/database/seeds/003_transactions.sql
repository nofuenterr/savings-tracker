INSERT INTO transactions (user_id, goal_id, transaction_type, amount, note, created_at) VALUES
  -- goal 1: MacBook Pro M4
  (1, 1, 'deposit',    500,  'Starting fund from freelance project', '2025-11-15T09:30:00Z'),
  (1, 1, 'deposit',    200,  'Monthly savings',                      '2025-12-01T10:00:00Z'),
  (1, 1, 'deposit',    350,  'Sold old monitor',                     '2025-12-18T14:22:00Z'),
  (1, 1, 'withdrawal', 150,  'Needed for car repair',                '2025-12-30T10:00:00Z'),
  (1, 1, 'deposit',    200,  'Monthly savings',                      '2026-01-01T08:15:00Z'),
  (1, 1, 'deposit',    200,  'Monthly savings',                      '2026-02-01T09:00:00Z'),
  (1, 1, 'deposit',    250,  'Bonus from client work',               '2026-02-20T11:30:00Z'),
  (1, 1, 'deposit',    200,  'Monthly savings',                      '2026-03-01T09:00:00Z'),

  -- goal 2: Mechanical Keyboard
  (1, 2, 'deposit',    75,   'Birthday money',                       '2025-12-10T16:45:00Z'),
  (1, 2, 'deposit',    50,   NULL,                                   '2025-12-22T09:00:00Z'),
  (1, 2, 'deposit',    100,  'Holiday bonus',                        '2025-12-28T12:30:00Z'),
  (1, 2, 'deposit',    75,   NULL,                                   '2026-01-05T11:20:00Z'),
  (1, 2, 'deposit',    50,   'Almost there!',                        '2026-02-01T08:00:00Z'),

  -- goal 3: React Conf Trip
  (1, 3, 'deposit',    299,  'Early bird ticket purchased',          '2025-10-20T14:30:00Z'),
  (1, 3, 'deposit',    150,  'Flight fund',                          '2025-11-01T09:00:00Z'),
  (1, 3, 'deposit',    150,  'Flight fund',                          '2025-12-01T09:00:00Z'),
  (1, 3, 'deposit',    200,  'Hotel savings',                        '2025-12-15T17:45:00Z'),
  (1, 3, 'withdrawal', 299,  'Ticket refunded, rebooking later',     '2025-12-20T09:00:00Z'),
  (1, 3, 'deposit',    150,  NULL,                                   '2026-01-02T10:00:00Z'),
  (1, 3, 'deposit',    200,  'Airbnb deposit',                       '2026-02-01T09:30:00Z'),
  (1, 3, 'deposit',    150,  'Spending money fund',                  '2026-03-01T10:00:00Z'),

  -- goal 4: Anniversary Trip to Italy
  (1, 4, 'deposit',    400,  'Initial deposit',                      '2025-09-01T10:30:00Z'),
  (1, 4, 'deposit',    300,  'Monthly contribution',                 '2025-10-01T09:00:00Z'),
  (1, 4, 'deposit',    300,  'Monthly contribution',                 '2025-11-01T09:00:00Z'),
  (1, 4, 'deposit',    500,  'Holiday bonus',                        '2025-12-20T14:20:00Z'),
  (1, 4, 'deposit',    300,  'Monthly contribution',                 '2026-01-01T09:00:00Z'),
  (1, 4, 'withdrawal', 200,  'Visa application fees',                '2026-01-18T11:00:00Z'),
  (1, 4, 'deposit',    300,  'Monthly contribution',                 '2026-02-01T09:00:00Z'),
  (1, 4, 'deposit',    300,  'Monthly contribution',                 '2026-03-01T09:00:00Z'),

  -- goal 5: 4K Monitor Upgrade
  (1, 5, 'deposit',    100,  'Starting the fund',                    '2025-12-10T08:30:00Z'),
  (1, 5, 'deposit',    75,   NULL,                                   '2025-12-24T12:00:00Z'),
  (1, 5, 'deposit',    100,  'Found a deal, need to save faster',    '2026-01-15T14:00:00Z'),
  (1, 5, 'deposit',    75,   NULL,                                   '2026-02-01T10:00:00Z'),
  (1, 5, 'deposit',    100,  NULL,                                   '2026-03-01T09:00:00Z'),

  -- goal 6: Emergency Fund
  (1, 6, 'deposit',    500,  'Starting fresh',                       '2025-06-01T12:30:00Z'),
  (1, 6, 'deposit',    400,  NULL,                                   '2025-07-01T09:00:00Z'),
  (1, 6, 'deposit',    400,  NULL,                                   '2025-08-01T09:00:00Z'),
  (1, 6, 'withdrawal', 250,  'Unexpected vet bill',                  '2025-08-18T14:00:00Z'),
  (1, 6, 'deposit',    350,  'Smaller month',                        '2025-09-01T09:00:00Z'),
  (1, 6, 'deposit',    400,  NULL,                                   '2025-10-01T09:00:00Z'),
  (1, 6, 'deposit',    400,  NULL,                                   '2025-11-01T09:00:00Z'),
  (1, 6, 'deposit',    400,  NULL,                                   '2025-12-01T09:00:00Z'),
  (1, 6, 'withdrawal', 300,  'Emergency car tow and repair',         '2025-12-12T08:30:00Z'),
  (1, 6, 'deposit',    350,  'Post-holiday tight month',             '2026-01-01T09:00:00Z'),
  (1, 6, 'deposit',    400,  NULL,                                   '2026-02-01T09:00:00Z'),
  (1, 6, 'deposit',    400,  NULL,                                   '2026-03-01T09:00:00Z'),

  -- goal 7: New Road Bike
  (1, 7, 'deposit',    200,  'Sold old bike',                        '2025-11-10T15:30:00Z'),
  (1, 7, 'deposit',    150,  NULL,                                   '2025-12-01T10:00:00Z'),
  (1, 7, 'withdrawal', 100,  'Bought cycling gear instead',          '2025-12-15T16:00:00Z'),
  (1, 7, 'deposit',    150,  NULL,                                   '2026-01-03T11:00:00Z'),
  (1, 7, 'deposit',    200,  'Tax refund portion',                   '2026-02-10T13:00:00Z'),
  (1, 7, 'deposit',    150,  NULL,                                   '2026-03-01T10:00:00Z');

  -- goal 8: Ergonomic Chair — no deposits yet