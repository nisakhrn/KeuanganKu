import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/landing.css';

function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return React.createElement('div', { className: 'app' },
    // Navigation
    React.createElement('nav', { className: 'navbar' },
      React.createElement('div', { className: 'nav-container' },
        React.createElement('div', { className: 'nav-content' },
          React.createElement('div', { className: 'logo-section' },
            React.createElement('div', { className: 'logo-icon' },
              React.createElement('i', { className: 'fas fa-folder' })
            ),
            React.createElement('span', { className: 'logo-text' }, 'KeuanganKu')
          ),
          
          // Desktop Menu
          React.createElement('div', { className: 'desktop-menu' },
            React.createElement('button', { className: 'nav-link', onClick: () => scrollToSection('features') }, 'Fitur'),
            React.createElement('button', { className: 'nav-link', onClick: () => scrollToSection('benefits') }, 'Keuntungan'),
            React.createElement('button', { className: 'btn-login', onClick: () => navigate('/login') }, 'Masuk'),
            React.createElement('button', { className: 'btn-register', onClick: () => navigate('/register') }, 'Daftar')
          ),

          // Mobile Menu Button
          React.createElement('button', {
            className: 'mobile-menu-btn',
            onClick: () => setMobileMenuOpen(!mobileMenuOpen)
          }, mobileMenuOpen ? '✕' : '☰')
        ),

        // Mobile Menu
        mobileMenuOpen && React.createElement('div', { className: 'mobile-menu' },
          React.createElement('button', { className: 'mobile-link', onClick: () => scrollToSection('features') }, 'Fitur'),
          React.createElement('button', { className: 'mobile-link', onClick: () => scrollToSection('benefits') }, 'Keuntungan'),
          React.createElement('button', { className: 'mobile-link', onClick: () => scrollToSection('about') }, 'Tentang'),
          React.createElement('button', { className: 'mobile-btn-login', onClick: () => navigate('/login') }, 'Masuk'),
          React.createElement('button', { className: 'mobile-btn-register', onClick: () => navigate('/register') }, 'Daftar')
        )
      )
    ),

    // Hero Section
    React.createElement('section', { className: 'hero-section' },
      React.createElement('div', { className: 'hero-container' },
        React.createElement('div', { className: 'hero-content' },
          React.createElement('h1', { className: 'hero-title' },
            'Kelola Keuangan Anda dengan ',
            React.createElement('span', { className: 'hero-highlight' }, 'Mudah & Cerdas')
          ),
          React.createElement('p', { className: 'hero-subtitle' },
            'Catat pemasukan dan pengeluaran, pantau grafik keuangan, dan wujudkan tujuan finansial Anda dengan KeuanganKu.'
          ),
          React.createElement('div', { className: 'hero-buttons' },
            React.createElement('button', { className: 'btn-primary', onClick: () => navigate('/register') }, 
              'Mulai Sekarang ',
              React.createElement('span', null, '→')
            ),
            React.createElement('button', { className: 'btn-secondary', onClick: () => scrollToSection('features') }, 'Lihat Demo')
          ),
          React.createElement('div', { className: 'hero-stats' },
            React.createElement('div', { className: 'stat-item' },
              React.createElement('div', { className: 'stat-number' }, '10K+'),
              React.createElement('div', { className: 'stat-label' }, 'Pengguna Aktif')
            ),
            React.createElement('div', { className: 'stat-item' },
              React.createElement('div', { className: 'stat-number' }, '4.8/5'),
              React.createElement('div', { className: 'stat-label' }, 'Rating User')
            )
          )
        ),
        React.createElement('div', { className: 'hero-image' },
          React.createElement('div', { className: 'card-wrapper' },
            React.createElement('div', { className: 'dashboard-card' },
              React.createElement('div', { className: 'card-header' },
                React.createElement('h3', { className: 'card-title' }, 'Saldo Total'),
                React.createElement('span', { className: 'card-icon' }, '💰')
              ),
              React.createElement('div', { className: 'card-balance' }, 'Rp 5.250.000'),
              React.createElement('div', { className: 'card-trend' }, '📈 +12% dari bulan lalu'),
              React.createElement('div', { className: 'card-stats' },
                React.createElement('div', { className: 'stat-box stat-income' },
                  React.createElement('div', { className: 'stat-box-label' }, 'Pemasukan'),
                  React.createElement('div', { className: 'stat-box-value' }, 'Rp 8.500.000')
                ),
                React.createElement('div', { className: 'stat-box stat-expense' },
                  React.createElement('div', { className: 'stat-box-label' }, 'Pengeluaran'),
                  React.createElement('div', { className: 'stat-box-value' }, 'Rp 3.200.000')
                )
              )
            )
          )
        )
      )
    ),

    // Features Section
    React.createElement('section', { id: 'features', className: 'features-section' },
      React.createElement('div', { className: 'section-container' },
        React.createElement('div', { className: 'section-header' },
          React.createElement('h2', { className: 'section-title' }, 'Fitur Unggulan'),
          React.createElement('p', { className: 'section-subtitle' }, 'Semua yang Anda butuhkan untuk mengelola keuangan')
        ),
        
        React.createElement('div', { className: 'features-grid' },
          React.createElement('div', { className: 'feature-card' },
            React.createElement('div', { className: 'feature-icon' }, '📊'),
            React.createElement('h3', { className: 'feature-title' }, 'Dashboard Keuangan'),
            React.createElement('p', { className: 'feature-desc' }, 
              'Kelola kondisi finansial Anda dengan mudah melalui tampilan ringkas yang menampilkan saldo, pemasukan, pengeluaran, dan grafik keuangan secara real-time'
            )
          ),

          React.createElement('div', { className: 'feature-card' },
            React.createElement('div', { className: 'feature-icon' }, '📝'),
            React.createElement('h3', { className: 'feature-title' }, 'Riwayat Transaksi'),
            React.createElement('p', { className: 'feature-desc' }, 
              'Pantau semua transaksi Anda dengan riwayat lengkap dan detail yang terorganisir.'
            )
          )
        )
      )
    ),

    // Benefits Section
    React.createElement('section', { id: 'benefits', className: 'benefits-section' },
      React.createElement('div', { className: 'section-container' },
        React.createElement('div', { className: 'section-header' },
          React.createElement('h2', { className: 'section-title' }, 'Mengapa Memilih KeuanganKu?'),
          React.createElement('p', { className: 'section-subtitle' }, 'Solusi terbaik untuk keuangan yang lebih sehat')
        ),
        
        React.createElement('div', { className: 'benefits-content' },
          React.createElement('div', { className: 'benefits-list' },
            React.createElement('div', { className: 'benefit-item' },
              React.createElement('div', { className: 'benefit-icon benefit-icon-green' }, '📈'),
              React.createElement('div', { className: 'benefit-text' },
                React.createElement('h3', { className: 'benefit-title' }, 'Mudah Digunakan'),
                React.createElement('p', { className: 'benefit-desc' }, 
                  'Interface yang intuitif dan user-friendly untuk semua kalangan.'
                )
              )
            ),
            
            React.createElement('div', { className: 'benefit-item' },
              React.createElement('div', { className: 'benefit-icon benefit-icon-blue' }, '📊'),
              React.createElement('div', { className: 'benefit-text' },
                React.createElement('h3', { className: 'benefit-title' }, 'Laporan Detail'),
                React.createElement('p', { className: 'benefit-desc' }, 
                  'Dapatkan insight mendalam tentang pola keuangan Anda.'
                )
              )
            ),
            
            React.createElement('div', { className: 'benefit-item' },
              React.createElement('div', { className: 'benefit-icon benefit-icon-purple' }, '🛡️'),
              React.createElement('div', { className: 'benefit-text' },
                React.createElement('h3', { className: 'benefit-title' }, '100% Aman'),
                React.createElement('p', { className: 'benefit-desc' }, 
                  'Privasi dan keamanan data Anda adalah prioritas utama kami.'
                )
              )
            )
          ),
          
          React.createElement('div', { className: 'benefits-cta-card' },
            React.createElement('h3', { className: 'cta-card-title' }, 'Mulai Gratis Hari Ini!'),
            React.createElement('p', { className: 'cta-card-desc' },
              'Bergabunglah dengan ribuan pengguna yang sudah merasakan kemudahan mengelola keuangan dengan KeuanganKu.'
            ),
            React.createElement('ul', { className: 'cta-list' },
              React.createElement('li', { className: 'cta-list-item' }, '→ Tanpa biaya tersembunyi'),
              React.createElement('li', { className: 'cta-list-item' }, '→ Tidak perlu kartu kredit'),
              React.createElement('li', { className: 'cta-list-item' }, '→ Setup dalam 2 menit')
            ),
            React.createElement('button', { className: 'cta-card-button', onClick: () => navigate('/register') }, 'Daftar Sekarang')
          )
        )
      )
    ),

    // CTA Section
    React.createElement('section', { className: 'cta-section' },
      React.createElement('div', { className: 'cta-container' },
        React.createElement('h2', { className: 'cta-title' }, 
          'Siap Mengelola Keuangan dengan Lebih Baik?'
        ),
        React.createElement('p', { className: 'cta-subtitle' },
          'Bergabunglah dengan KeuanganKu sekarang dan raih kebebasan finansial Anda!'
        ),
        React.createElement('div', { className: 'cta-buttons' },
          React.createElement('button', { className: 'cta-btn-primary', onClick: () => navigate('/register') }, 'Daftar Gratis'),
          React.createElement('button', { className: 'cta-btn-secondary', onClick: () => scrollToSection('about') }, 'Pelajari Lebih Lanjut')
        )
      )
    ),

    // Footer
    React.createElement('footer', { className: 'footer' },
      React.createElement('div', { className: 'footer-container' },
        React.createElement('div', { className: 'footer-grid' },
          React.createElement('div', { className: 'footer-col' },
            React.createElement('div', { className: 'footer-logo' },
              React.createElement('div', { className: 'footer-logo-icon' },
                React.createElement('i', { className: 'fas fa-folder' })
              ),
              React.createElement('span', { className: 'footer-logo-text' }, 'KeuanganKu')
            ),
            React.createElement('p', { className: 'footer-desc' }, 
              'Solusi cerdas untuk mengelola keuangan pribadi Anda.'
            )
          ),
          
          React.createElement('div', { className: 'footer-col' },
            React.createElement('h4', { className: 'footer-heading' }, 'Produk'),
            React.createElement('ul', { className: 'footer-links' },
              React.createElement('li', null, React.createElement('a', { href: '#' }, 'Fitur')),
              React.createElement('li', null, React.createElement('a', { href: '#' }, 'Harga')),
              React.createElement('li', null, React.createElement('a', { href: '#' }, 'Tutorial'))
            )
          ),
          
          React.createElement('div', { className: 'footer-col' },
            React.createElement('h4', { className: 'footer-heading' }, 'Perusahaan'),
            React.createElement('ul', { className: 'footer-links' },
              React.createElement('li', null, React.createElement('a', { href: '#' }, 'Tentang Kami')),
              React.createElement('li', null, React.createElement('a', { href: '#' }, 'Blog')),
              React.createElement('li', null, React.createElement('a', { href: '#' }, 'Karir'))
            )
          ),
          
          React.createElement('div', { className: 'footer-col' },
            React.createElement('h4', { className: 'footer-heading' }, 'Bantuan'),
            React.createElement('ul', { className: 'footer-links' },
              React.createElement('li', null, React.createElement('a', { href: '#' }, 'Pusat Bantuan')),
              React.createElement('li', null, React.createElement('a', { href: '#' }, 'Kontak')),
              React.createElement('li', null, React.createElement('a', { href: '#' }, 'FAQ'))
            )
          )
        ),
        
        React.createElement('div', { className: 'footer-bottom' },
          React.createElement('p', null, '© 2025 KeuanganKu. All rights reserved.')
        )
      )
    )
  );
}

export default Landing;