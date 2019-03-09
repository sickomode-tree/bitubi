Frontend деплоится на netlify.com автоматически при каждом пуше в репозиторий на bibucket.
Все содержимое репозитория есть архиве.

При создании проекта на netlify надо указать:
Repository: <путь до репозитория на bitbucket>
Build command: yarn build
Publish directory: dist/
Production branch: master
Prerendering: true
Custom domains: связать с хостингом
	api.bitubi.ru 300  IN A       185.151.244.202
	bitubi.ru     3600 IN NETLIFY bitubi.netlify.com
	www.bitubi.ru 3600 IN NETLIFY bitubi.netlify.com
Nameservers:
	dns1.p04.nsone.net
	dns2.p04.nsone.net
	dns3.p04.nsone.net
	dns4.p04.nsone.net
