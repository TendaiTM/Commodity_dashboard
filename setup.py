from setuptools import setup, find_packages

setup(
    name="commodity_dashboard",
    version="0.1.0",
    description="Commodity Dashboard App",
    author="Your Name",
    author_email="your@email.com",
    packages=find_packages(),
    zip_safe=False,
    include_package_data=True,
    install_requires=[
        
        "frappe",
    ],
)