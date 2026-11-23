import sys, asyncio
from playwright.async_api import async_playwright
OUT='/tmp/claude-0/-home-claude/094927db-0586-51e9-928a-509967894e32/scratchpad/'
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width':1440,'height':900})
        errs=[]
        pg.on('console', lambda m: errs.append(m.text) if m.type in ('error','warning') else None)
        pg.on('pageerror', lambda e: errs.append('PAGEERR '+str(e)))
        await pg.goto('file:///home/claude/proyecto/dist/archivo-sagrado-nilo.html')
        await pg.wait_for_timeout(6500)
        await pg.screenshot(path=OUT+'s_hero.png')
        await pg.evaluate("window.scrollTo(0, 1100)"); await pg.wait_for_timeout(900)
        await pg.screenshot(path=OUT+'s_insc.png')
        await pg.evaluate("document.querySelector('#mapa').scrollIntoView()"); await pg.wait_for_timeout(2500)
        await pg.screenshot(path=OUT+'s_map.png')
        print('\n'.join(errs[:20]))
        await b.close()
asyncio.run(main())
