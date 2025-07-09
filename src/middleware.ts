import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 如果是根路径，则重定向到默认 locale，例如 zh
  if (pathname === '/') {
    const locale = 'zh';
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return NextResponse.next();
}
