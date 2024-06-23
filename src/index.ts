import { Hono } from 'hono';
import { adminRouter } from './routes/adminRoutes';
import { schoolRouter } from './routes/schoolRoutes';
import { teacherRouter } from './routes/teacherRoutes';
import { childRouter } from './routes/childRoutes';
import { motherRouter} from './routes/motherRoutes';
import { fatherRouter} from './routes/fatherRoutes';
import { emergencyPersonRouter } from './routes/emergencyPersonRoutes';
import { releasePersonRouter} from './routes/releasePersonRoutes';
import { attendanceRouter } from './routes/attendanceRoutes';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.route('/api/admin', adminRouter);
app.route('/api/school', schoolRouter);
app.route('/api/teacher', teacherRouter);
app.route('/api/child', childRouter);
app.route('/api/mother', motherRouter);
app.route('/api/father', fatherRouter);
app.route('/api/emergency-person', emergencyPersonRouter);
app.route('/api/release-person', releasePersonRouter);
app.route('/api/attendance', attendanceRouter);

export default app;
