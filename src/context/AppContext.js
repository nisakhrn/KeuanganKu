import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState({
    // Format: email sebagai key
    // "anis@example.com": {
    //   name: "Anis",
    //   email: "anis@example.com",
    //   transactions: []
    // }
  });

  // Register user baru
  const register = (name, email, password) => {
    if (users[email]) {
      return { success: false, message: "Email sudah terdaftar" };
    }
    
    setUsers({
      ...users,
      [email]: {
        name,
        email,
        password,
        transactions: []
      }
    });
    
    return { success: true, message: "Registrasi berhasil" };
  };

  // Login
  const login = (email, password) => {
    const user = users[email];
    if (!user) {
      return { success: false, message: "Email tidak ditemukan" };
    }
    
    if (user.password !== password) {
      return { success: false, message: "Password salah" };
    }
    
    setCurrentUser(user);
    return { success: true, message: "Login berhasil" };
  };

  // Logout
  const logout = () => {
    setCurrentUser(null);
  };

  // Tambah transaksi
  const addTransaction = (transaction) => {
    if (!currentUser) return;
    
    const newTransaction = {
      id: Date.now(),
      ...transaction,
      date: new Date().toISOString().split('T')[0]
    };
    
    setUsers({
      ...users,
      [currentUser.email]: {
        ...users[currentUser.email],
        transactions: [...users[currentUser.email].transactions, newTransaction]
      }
    });
    
    // Update current user juga
    setCurrentUser({
      ...currentUser,
      transactions: [...currentUser.transactions, newTransaction]
    });
  };

  // Hapus transaksi
  const deleteTransaction = (transactionId) => {
    if (!currentUser) return;
    
    const updatedTransactions = currentUser.transactions.filter(
      t => t.id !== transactionId
    );
    
    setUsers({
      ...users,
      [currentUser.email]: {
        ...users[currentUser.email],
        transactions: updatedTransactions
      }
    });
    
    setCurrentUser({
      ...currentUser,
      transactions: updatedTransactions
    });
  };

  return React.createElement(
    AppContext.Provider,
    {
      value: {
        currentUser,
        users,
        register,
        login,
        logout,
        addTransaction,
        deleteTransaction
      }
    },
    children
  );
}

export function useApp() {
  return useContext(AppContext);
}