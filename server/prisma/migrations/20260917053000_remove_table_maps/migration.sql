-- Rename tables so they match the Prisma model names (no @@map).
-- Two-step rename avoids MySQL case-insensitive name clashes.

RENAME TABLE `gps_points` TO `gps_points_tmp`;
RENAME TABLE `gps_points_tmp` TO `GpsPoint`;

RENAME TABLE `trips` TO `trips_tmp`;
RENAME TABLE `trips_tmp` TO `Trip`;

RENAME TABLE `users` TO `users_tmp`;
RENAME TABLE `users_tmp` TO `User`;
