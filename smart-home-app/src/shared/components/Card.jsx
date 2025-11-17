// src/shared/components/Card.jsx
export const Card = ({children, className = '', title = null, badge = null}) => {
    return (
        <div className={`card ${className}`}>
            {(title || badge) && (
                <div className="flex justify-between items-center mb-4">
                    {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
                    {badge && badge}
                </div>
            )}
            {children}
        </div>
    );
};

export const CardGrid = ({children, className = ''}) => {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
            {children}
        </div>
    );
};