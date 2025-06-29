# Internal Portal - Company Management System

A centralized portal for managing different company features and resources. Built with Next.js 15, TypeScript, and shadcn/ui components.

## Features

### 🏠 Dashboard

- Overview of company statistics
- Quick access to different portals
- Real-time metrics display

### 👥 Employee Management Portal

- View all employees in a searchable table
- Add new employees with comprehensive information
- Edit and delete employee records
- Filter by department, position, and status
- Track hire dates and employment status

### 🛠️ Tools Inventory Portal

- Comprehensive tools and equipment tracking
- Add new tools with detailed information
- Check out and return tools functionality
- Track tool conditions and locations
- Search and filter tools by various criteria
- Monitor tool usage and assignments

## Project Structure

```
internal_sites/
├── app/
│   ├── employees/          # Employee management portal
│   │   └── page.tsx
│   ├── tools/             # Tools inventory portal
│   │   └── page.tsx
│   ├── layout.tsx         # Root layout with navigation
│   └── page.tsx           # Dashboard
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── header.tsx        # Main navigation header
│   └── navigation.tsx    # Navigation component
├── lib/
│   ├── database.ts       # Database configuration and interfaces
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Database**: MySQL (planned integration)

## Getting Started

1. **Install dependencies**:

   ```bash
   yarn install
   ```

2. **Run the development server**:

   ```bash
   yarn dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Integration (Planned)

The project is structured to easily integrate with MySQL database. The database configuration and interfaces are already set up in `lib/database.ts`.

### Environment Variables Needed:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=internal_portal
```

### Database Tables (to be created):

- `employees` - Employee records
- `tools` - Tools and equipment inventory
- `tool_transactions` - Tool checkout/return history

## Authentication (Planned)

Authentication system will be added to secure access to the portal. This will include:

- User login/logout
- Role-based access control
- Session management

## Future Enhancements

- [ ] Database integration with MySQL
- [ ] Authentication system
- [ ] User management
- [ ] Reporting and analytics
- [ ] Email notifications
- [ ] Mobile responsive improvements
- [ ] Export functionality (CSV, PDF)
- [ ] Audit logging
- [ ] Advanced search and filtering
- [ ] Bulk operations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for internal company use.
