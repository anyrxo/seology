import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { path: string[] } }
) {
  const { path: pathSegments } = params;

  // Determine the HTML file to serve
  let htmlFile = 'index.html';

  if (pathSegments && pathSegments.length > 0) {
    const requestedPath = pathSegments.join('/');

    // Map routes to HTML files
    const routeMap: Record<string, string> = {
      'about': 'about.html',
      'projects': 'projects.html',
      'contact': 'contact.html',
      'dashboard': 'dashboard/index.html',
      'dashboard/components': 'dashboard/components.html',
      'dashboard/search': 'dashboard/search.html',
      'dashboard/changelog': 'dashboard/changelog.html',
      'dashboard/licenses': 'dashboard/licenses.html',
    };

    htmlFile = routeMap[requestedPath] || `${requestedPath}.html`;
  }

  // Read the HTML file from public folder
  const htmlPath = path.join(process.cwd(), 'public', htmlFile);

  try {
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    return new NextResponse(htmlContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (error) {
    return new NextResponse('Not Found', { status: 404 });
  }
}
