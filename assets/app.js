/**
 * Portfolio navigation and project filters adapted from vCard Personal Portfolio.
 * Copyright (c) 2022 codewithsadee. Licensed under the MIT License.
 * https://github.com/codewithsadee/vcard-personal-portfolio
 * Adapted for tfiyw-wei: accessible routing, command menu and contact actions.
 */
'use strict';

(() => {
  const init = () => {
    const pages = [...document.querySelectorAll('[data-page]')];
    const navigation = [...document.querySelectorAll('[data-nav-link][data-target]')];
    const routes = new Set(pages.map((page) => page.dataset.page));
    const defaultRoute = routes.has('about') ? 'about' : pages[0]?.dataset.page;
    const path = document.querySelector('#window-path');
    const label = document.querySelector('#window-label');
    const content = document.querySelector('#window-content');
    const section = document.querySelector('#current-section');
    const terminal = document.querySelector('#terminal-command');
    const routeDetails = {
      about: { path: 'about.md', label: '关于我' },
      projects: { path: 'projects.gallery', label: '作品' },
      process: { path: 'process.md', label: '探索方法' },
      notes: { path: 'notes.library', label: '记录与分享' },
      contact: { path: 'contact.card', label: '找到我' },
    };
    const dialog = document.querySelector('#command-dialog');
    const commandSearch = document.querySelector('#command-search');
    const commands = [...document.querySelectorAll('[data-command-target]')];
    let commandOpener = null;

    const readRoute = () => {
      let hash;
      try {
        hash = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        hash = '';
      }
      return routes.has(hash) ? hash : defaultRoute;
    };

    const showRoute = (route, focusHeading = false) => {
      if (!routes.has(route)) return;
      pages.forEach((page) => {
        const active = page.dataset.page === route;
        page.hidden = !active;
        page.classList.toggle('active', active);
      });
      navigation.forEach((link) => {
        const active = link.dataset.target === route;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });
      const details = routeDetails[route];
      if (path) path.textContent = details?.path || `${route}.md`;
      if (label) label.textContent = details?.label || route;
      if (section) section.textContent = route.toUpperCase();
      if (terminal) terminal.textContent = `open ${route}`;
      window.requestAnimationFrame(() => {
        content?.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        if (!focusHeading) return;
        const page = pages.find((item) => item.dataset.page === route);
        const heading = page?.querySelector('[data-page-heading]');
        heading?.focus({ preventScroll: true });
      });
    };

    const syncRoute = (focusHeading = false) => {
      const route = readRoute();
      if (window.location.hash && window.location.hash !== `#${route}` && route) {
        window.history.replaceState(null, '', `#${route}`);
      }
      showRoute(route, focusHeading);
    };

    const navigate = (target) => {
      if (!routes.has(target)) return;
      if (window.location.hash === `#${target}`) showRoute(target, true);
      else window.location.hash = target;
    };

    document.querySelectorAll('[data-nav-link][data-target], [data-route]').forEach((link) => {
      link.addEventListener('click', (event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const target = link.dataset.target || link.getAttribute('href')?.replace(/^#/, '');
        if (!routes.has(target)) return;
        event.preventDefault();
        navigate(target);
      });
    });
    window.addEventListener('hashchange', () => syncRoute(true));
    syncRoute();

    const desktopClock = document.querySelector('#desktop-clock');
    if (desktopClock) {
      const updateClock = () => {
        const now = new Date();
        const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        desktopClock.textContent = `${now.getMonth() + 1}/${now.getDate()} 周${weekdays[now.getDay()]} ${hours}:${minutes}`;
        desktopClock.dateTime = now.toISOString();
      };
      updateClock();
      window.setInterval(updateClock, 30000);
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) updateClock();
      });
    }

    // The skip link moves keyboard focus without replacing the page route.
    document.querySelectorAll('.skip-link[href="#main-window"]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const main = document.querySelector('#main-window');
        if (!main) return;
        event.preventDefault();
        main.focus({ preventScroll: true });
        main.scrollIntoView({ block: 'start', behavior: 'instant' });
      });
    });

    // Category filtering retains vCard's active class and also updates hidden/ARIA.
    const filterButtons = [...document.querySelectorAll('[data-filter-btn][data-filter]')];
    const filterItems = [...document.querySelectorAll('[data-filter-item][data-category]')];
    const filterProjects = (category) => {
      filterButtons.forEach((button) => {
        const active = button.dataset.filter === category;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      filterItems.forEach((item) => {
        const visible = category === 'all' || item.dataset.category === category;
        item.hidden = !visible;
        item.classList.toggle('active', visible);
      });
    };
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => filterProjects(button.dataset.filter));
    });
    if (filterButtons.length) {
      const selected = filterButtons.find((button) => button.classList.contains('active'));
      filterProjects(selected?.dataset.filter || 'all');
    }

    const email = '179369971@qq.com';
    const copyStatus = document.querySelector('#copy-status');
    document.querySelectorAll('[data-copy-email]').forEach((button) => {
      button.addEventListener('click', async () => {
        if (copyStatus) copyStatus.textContent = '';
        try {
          if (!navigator.clipboard?.writeText) throw new Error('Clipboard is unavailable');
          await navigator.clipboard.writeText(email);
          if (copyStatus) copyStatus.textContent = `已复制邮箱：${email}`;
        } catch {
          if (copyStatus) {
            copyStatus.textContent = `浏览器未允许自动复制，请选中并手动复制：${email}`;
            copyStatus.style.userSelect = 'text';
          }
        }
      });
    });

    const filterCommands = () => {
      const query = (commandSearch?.value || '').trim().toLocaleLowerCase();
      commands.forEach((button) => {
        const content = `${button.textContent} ${button.dataset.keywords || ''}`.toLocaleLowerCase();
        button.hidden = !content.includes(query);
      });
      const emptyState = document.querySelector('[data-command-empty]');
      if (emptyState) emptyState.hidden = commands.some((button) => !button.hidden);
    };

    const closeCommands = () => {
      if (!dialog?.open) return;
      if (typeof dialog.close === 'function') dialog.close();
      else {
        dialog.removeAttribute('open');
        commandOpener?.focus();
      }
    };

    const openCommands = (opener) => {
      if (!dialog || dialog.open) return;
      commandOpener = opener || document.activeElement;
      if (commandSearch) commandSearch.value = '';
      filterCommands();
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
      commandSearch?.focus();
    };

    document.querySelectorAll('[data-open-command]').forEach((button) => {
      button.addEventListener('click', () => openCommands(button));
    });
    document.querySelectorAll('[data-close-command]').forEach((button) => {
      button.addEventListener('click', closeCommands);
    });
    commandSearch?.addEventListener('input', filterCommands);
    commands.forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.dataset.commandTarget;
        if (!routes.has(target)) return;
        closeCommands();
        navigate(target);
      });
    });
    dialog?.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right
          || event.clientY < bounds.top || event.clientY > bounds.bottom) closeCommands();
    });
    dialog?.addEventListener('keydown', (event) => {
      const visible = commands.filter((button) => !button.hidden && !button.disabled);
      if (event.key === 'Enter' && event.target === commandSearch) {
        event.preventDefault();
        visible[0]?.click();
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        if (!visible.length) return;
        event.preventDefault();
        const index = visible.indexOf(document.activeElement);
        const next = index < 0
          ? (event.key === 'ArrowDown' ? 0 : visible.length - 1)
          : (index + (event.key === 'ArrowDown' ? 1 : -1) + visible.length) % visible.length;
        visible[next].focus();
      }
    });

    document.addEventListener('keydown', (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k' && dialog) {
        event.preventDefault();
        if (dialog.open) closeCommands();
        else openCommands(document.activeElement);
      } else if (event.key === 'Escape') {
        if (dialog?.open) {
          event.preventDefault();
          closeCommands();
        }
      }
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
