import os

filepath = 'backend/pom.xml'

with open(filepath, 'r') as f:
    content = f.read()

replacement = '''
		<dependency>
			<groupId>org.springdoc</groupId>
			<artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
			<version>2.2.0</version>
		</dependency>
	</dependencies>
'''

new_content = content.replace('</dependencies>', replacement)

with open(filepath, 'w') as f:
    f.write(new_content)
