/**
 * Portfolio navigation adapted from vCard Personal Portfolio.
 * Copyright (c) 2022 codewithsadee. Licensed under the MIT License.
 * https://github.com/codewithsadee/vcard-personal-portfolio
 * Adapted for tfiyw-wei: accessible routing, command menu and contact actions.
 */
'use strict';

(() => {
  const init = () => {
    const pages = [...document.querySelectorAll('[data-page]')];
    const navigation = [...document.querySelectorAll('[data-nav-link][data-target]')];
    const sections = new Map(pages.map((page) => [page.dataset.page, page]));
    const routes = new Set(sections.keys());
    const defaultRoute = routes.has('about') ? 'about' : pages[0]?.dataset.page;
    const dialog = document.querySelector('#command-dialog');
    const commandSearch = document.querySelector('#command-search');
    const commands = [...document.querySelectorAll('[data-command-target]')];
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    let commandOpener = null;
    let routeFrame = 0;
    let scrollFrame = 0;

    // This is one continuous document: navigation never hides a section.
    pages.forEach((page) => {
      page.hidden = false;
      if (!page.id) page.id = page.dataset.page;
    });

    const setActiveRoute = (route) => {
      navigation.forEach((link) => {
        const active = link.dataset.target === route;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    };

    const readRoute = () => {
      try {
        const hash = decodeURIComponent(window.location.hash.slice(1));
        return routes.has(hash) ? hash : (!hash ? defaultRoute : null);
      } catch {
        return null;
      }
    };

    const scrollToSection = (route, focusHeading = false, animate = false) => {
      const section = sections.get(route);
      if (!section) return;
      window.cancelAnimationFrame(routeFrame);
      routeFrame = window.requestAnimationFrame(() => {
        if (focusHeading) section.querySelector('[data-page-heading]')?.focus({ preventScroll: true });
        const behavior = animate && !reducedMotion?.matches ? 'smooth' : 'instant';
        if (route === defaultRoute) window.scrollTo({ top: 0, left: 0, behavior });
        else section.scrollIntoView({ block: 'start', behavior });
        setActiveRoute(route);
      });
    };

    const navigate = (target) => {
      if (!routes.has(target)) return;
      // Push only explicit navigation; normal scrolling never changes history.
      if (window.location.hash !== `#${target}`) window.history.pushState(null, '', `#${target}`);
      scrollToSection(target, true, true);
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
    const onHistoryNavigation = () => scrollToSection(readRoute(), false, false);
    window.addEventListener('popstate', onHistoryNavigation);
    window.addEventListener('hashchange', onHistoryNavigation);

    // Four sections make a small scroll observer sufficient and predictable.
    const updateActiveFromScroll = () => {
      scrollFrame = 0;
      if (!pages.length) return;
      const readingLine = Math.min(window.innerHeight * 0.3, 220);
      let active = pages[0];
      pages.forEach((page) => {
        if (page.getBoundingClientRect().top <= readingLine) active = page;
      });
      const atBottom = Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 2;
      if (atBottom) active = pages[pages.length - 1];
      setActiveRoute(active.dataset.page);
    };
    const onScroll = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateActiveFromScroll);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateActiveFromScroll();
    if (window.location.hash) scrollToSection(readRoute(), false, false);

    // The skip link moves keyboard focus without replacing the current hash.
    document.querySelectorAll('.skip-link[href="#main-window"]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const main = document.querySelector('#main-window');
        if (!main) return;
        event.preventDefault();
        main.focus({ preventScroll: true });
        main.scrollIntoView({ block: 'start', behavior: reducedMotion?.matches ? 'instant' : 'smooth' });
      });
    });

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
