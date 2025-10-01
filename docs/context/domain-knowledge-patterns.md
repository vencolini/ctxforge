# Domain Knowledge Patterns for Context Engineering

**Purpose:** Provide LLMs with domain-specific patterns and best practices to inform context discovery and specification generation.

---

## Search & Filter Features

### Common Patterns
- **Debounced input** (300ms standard) for API calls
- **Loading states** during search execution
- **Empty states** when no results found
- **Error handling** for network failures
- **Keyboard navigation** support (arrow keys, enter)
- **Accessibility** (aria-labels, screen reader support)

### Critical Context Questions
- Data volume (determines client vs server-side strategy)
- Searchable fields (affects indexing and performance)
- Real-time vs on-demand (impacts user experience)
- Existing search patterns in the project

### Performance Considerations
- Client-side: suitable for <1,000 items
- Server-side: required for >10,000 items
- Hybrid: combination with intelligent caching

---

## Form Input Features

### Common Patterns
- **Real-time validation** with debounced feedback
- **Error state management** with clear messaging
- **Success confirmation** after submission
- **Loading states** during processing
- **Field dependency handling** (conditional fields)

### Critical Context Questions
- Validation rules and timing
- Data submission destination
- Error handling strategy
- Multi-step vs single form

### Performance Considerations
- Validate on blur, submit on enter
- Minimize re-renders during typing
- Batch validation checks
- Progressive enhancement for complex forms

---

## File Upload Features

### Common Patterns
- **Drag and drop** interface with visual feedback
- **Progress indicators** for large files with cancel option
- **Preview functionality** before upload (thumbnails for images)
- **Error handling** for size/type violations with clear messaging
- **Multiple file support** with management interface and batch operations
- **Image compression** and optimization before upload
- **Accessibility** with keyboard navigation and screen reader support

### Critical Context Questions
- Supported file types and maximum sizes
- Processing requirements (resize, compress, format conversion)
- Storage destination and strategy (local, cloud, CDN)
- Preview and management needs (thumbnails, metadata display)
- Concurrent upload limits and queue management
- Security requirements (virus scanning, content validation)

### Performance Considerations
- Chunked uploads for large files (>10MB)
- Client-side validation before upload (type, size, dimensions)
- Image compression and optimization (WebP conversion, quality settings)
- Background processing for heavy operations (ResizeObserver, Web Workers)
- Progressive enhancement for drag-and-drop (fallback to file input)
- Memory management for large file previews (object URL cleanup)

### React-Specific Patterns
- useDropzone hook for drag-and-drop functionality
- useCallback for upload handlers to prevent re-renders
- useState for upload progress and file queue management
- useEffect cleanup for file object URLs
- Error boundaries for upload failure handling

---

## Authentication Features

### Common Patterns
- **Secure credential handling** (no plain text storage)
- **Multi-step flows** (login, 2FA, recovery)
- **Session management** with appropriate timeouts
- **Error messaging** that doesn't leak security info
- **Accessibility** for password managers

### Critical Context Questions
- Authentication method (email/username, social, etc.)
- Security requirements (2FA, password rules)
- Session handling strategy
- Integration with existing auth systems

### Performance Considerations
- Secure password hashing (bcrypt, argon2)
- Token-based session management
- Rate limiting for login attempts
- Graceful handling of expired sessions

---

## API Integration Features

### Common Patterns
- **Loading states** during API calls
- **Error handling** with retry mechanisms
- **Caching strategies** for frequently accessed data
- **Optimistic updates** for better UX
- **Background sync** for offline capability

### Critical Context Questions
- API endpoints and data structure
- Error handling and retry strategy
- Caching requirements
- Real-time vs polling vs webhook patterns

### Performance Considerations
- Request debouncing and batching
- Intelligent caching with invalidation
- Error boundary implementation
- Network failure graceful degradation

---

## Database Query Features

### Common Patterns
- **Parameterized queries** to prevent injection
- **Appropriate indexing** for query patterns
- **Result pagination** for large datasets
- **Connection pooling** for performance
- **Transaction management** for data integrity

### Critical Context Questions
- Query complexity and frequency
- Data volume and growth expectations
- Performance requirements
- Consistency vs availability trade-offs

### Performance Considerations
- Use EXPLAIN/ANALYZE for query optimization
- Avoid SELECT * in production code
- Implement appropriate indexing strategy
- Consider read replicas for high-load scenarios

---

## UI Component Features

### Common Patterns
- **Responsive design** across device sizes
- **Loading and error states** for all interactions
- **Keyboard navigation** and accessibility
- **Consistent styling** with design system
- **Performance optimization** (memoization, lazy loading)

### Critical Context Questions
- Component reusability requirements
- State management approach
- Accessibility requirements
- Integration with existing design system

### Performance Considerations
- React.memo for expensive renders
- useMemo/useCallback for complex calculations
- Code splitting for large components
- Image optimization and lazy loading

---

## Real-time Features

### Common Patterns
- **WebSocket connections** with auto-reconnection
- **Optimistic updates** with conflict resolution
- **Connection status indicators** for user awareness
- **Message queuing** for offline scenarios
- **Rate limiting** and throttling for API protection

### Critical Context Questions
- Real-time requirements (chat, notifications, live data)
- Connection management strategy (persistent vs polling)
- Offline behavior and sync requirements
- Scale requirements (concurrent users, message volume)
- Security considerations (authentication, message encryption)

### Performance Considerations
- Connection pooling and management
- Message batching and compression
- Client-side caching with invalidation
- Graceful degradation for connection failures
- Memory cleanup for closed connections

---

## Mobile/Responsive Features

### Common Patterns
- **Touch gestures** (swipe, pinch, long press)
- **Responsive breakpoints** with mobile-first design
- **Viewport considerations** for different screen sizes
- **Performance optimization** for mobile networks
- **Native app integration** (PWA, hybrid apps)

### Critical Context Questions
- Target devices and screen sizes
- Touch interaction requirements
- Offline functionality needs
- Performance constraints on mobile
- Native features needed (camera, GPS, push notifications)

### Performance Considerations
- Image optimization and lazy loading
- Code splitting for smaller bundles
- Service worker for offline caching
- Touch event optimization
- Battery and data usage considerations

---

## Usage Guidelines for LLMs

### When Analyzing User Requests:

1. **Identify the domain** from the user's description
2. **Reference relevant patterns** from this knowledge base
3. **Ask context questions** specific to the domain's critical factors
4. **Apply best practices** automatically in the generated specification
5. **Note performance considerations** relevant to the project's scale

### When Generating Specifications:

1. **Include domain-specific scenarios** in user scenarios section
2. **Reference applicable performance directives** in technical notes
3. **Mention relevant patterns** for consistency
4. **Consider accessibility** and cross-platform requirements

---

**Remember:** This knowledge base should inform your context discovery and specification generation, but always prioritize the specific project's existing patterns and requirements over generic best practices.