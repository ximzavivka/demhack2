description = " BACKEND "

plugins {
    val kotlinVersion = "1.4.31"
    kotlin("jvm") version kotlinVersion
    kotlin("plugin.jpa") version kotlinVersion
    kotlin("plugin.spring") version kotlinVersion
    jacoco
    id("org.springframework.boot") version "2.4.3"
    id("io.spring.dependency-management") version "1.0.11.RELEASE"
}

repositories { mavenCentral(); mavenLocal(); jcenter()}

dependencies {
    // Web
    implementation("org.springframework.boot", "spring-boot-starter-web")
    implementation("com.fasterxml.jackson.module", "jackson-module-kotlin")
    // Email
    implementation("org.springframework.boot", "spring-boot-starter-mail")
    implementation("org.springframework.boot", "spring-boot-starter-thymeleaf")

    // Test
    val kotlinTestJunit = "1.4.31"
    testImplementation("org.springframework.boot", "spring-boot-starter-test")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit:$kotlinTestJunit")
    // Other
    val coroutines = "1.4.3"
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:$coroutines")
    implementation("org.springframework.boot", "spring-boot-starter-cache")
    annotationProcessor("org.springframework.boot", "spring-boot-starter-actuator")
    annotationProcessor("org.springframework.boot", "spring-boot-configuration-processor")
    implementation("commons-io:commons-io:2.8.0")
}

tasks {
    val java = "15"
    withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile> {
        kotlinOptions { jvmTarget = java }; sourceCompatibility = java; targetCompatibility = java
    }
    test { useJUnitPlatform()}
}
