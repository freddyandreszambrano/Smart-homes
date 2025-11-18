import { useState, useEffect } from 'react';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'security',
      title: 'Motion Detected',
      message: 'Front door camera detected movement',
      timestamp: new Date(Date.now() - 5 * 60000),
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'energy',
      title: 'High Energy Usage',
      message: 'Living room consuming 45% more than usual',
      timestamp: new Date(Date.now() - 30 * 60000),
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'device',
      title: 'Device Update Available',
      message: 'Smart thermostat firmware v2.4.1 ready',
      timestamp: new Date(Date.now() - 2 * 3600000),
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'automation',
      title: 'Automation Completed',
      message: 'Good Morning routine executed successfully',
      timestamp: new Date(Date.now() - 4 * 3600000),
      read: true,
      priority: 'low'
    },
    {
      id: 5,
      type: 'security',
      title: 'Door Unlocked',
      message: 'Front door was unlocked remotely',
      timestamp: new Date(Date.now() - 6 * 3600000),
      read: true,
      priority: 'medium'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getFilteredNotifications = () => {
    let filtered = notifications;

    if (filter !== 'all') {
      if (filter === 'unread') {
        filtered = filtered.filter(n => !n.read);
      } else {
        filtered = filtered.filter(n => n.type === filter);
      }
    }

    if (sortBy === 'recent') {
      filtered = [...filtered].sort((a, b) => b.timestamp - a.timestamp);
    } else if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      filtered = [...filtered].sort((a, b) =>
        priorityOrder[b.priority] - priorityOrder[a.priority]
      );
    }

    return filtered;
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications: getFilteredNotifications(),
    filter,
    sortBy,
    unreadCount,
    setFilter,
    setSortBy,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll
  };
};